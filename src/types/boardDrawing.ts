import { type dimension, type coordinate, checkCoordinateEquality, type Board, type shape } from "@/features/boards/board"
import type { Game } from "@/features/games/game"
import type { Instance } from "@/features/instances/instance"
import type { Piece } from "@/features/pieces/piece"
import type { InstancePieceMap } from "./instancePiece"
import type { moveCalculationResult } from "./moveCalculation"
import { basic_theme, type theme } from "./theme"

interface BoardDrawingParams { boardSize: dimension, cellWidth: number, ctx: CanvasRenderingContext2D, shape: shape }
type BoardDrawingFunction = (params: BoardDrawingParams) => void

const BoardDrawing = {
	boardColoring: (params: BoardDrawingParams, theme = basic_theme, selectedCell: coordinate | null, selectedColor?: string) => {
		const { boardSize, cellWidth, ctx } = params
		for (let gridX = 0; gridX < boardSize[0]; gridX++) {
			for (let gridY = 0; gridY < boardSize[1]; gridY++) {
				const radius = cellWidth / 2
				const [pixelX, pixelY] = getCenterCoords(gridX, gridY, radius, params.shape)
				ctx.fillStyle = (gridX + gridY) % 2 === 0 ? theme.gridPrimaryColor : theme.gridAlternateColor
				ctx.fillStyle = !!selectedCell && selectedCell[0] === gridX && selectedCell[1] === gridY && selectedColor ? selectedColor : ctx.fillStyle
				fillShape(ctx, pixelX, pixelY, radius, params.shape)
				ctx.strokeStyle = theme.gridOutlineColor
				strokeShape(ctx, pixelX, pixelY, radius, params.shape)
			}
		}
	},

	boardSpecialTiles: (params: BoardDrawingParams, board: Board, theme = basic_theme) => {
		const { cellWidth, ctx } = params;
		for (const [coord] of board.specialTiles) {
			const radius = cellWidth / 2
			const [pixelX, pixelY] = getCenterCoords(coord[0], coord[1], radius, params.shape)
			ctx.fillStyle = "red";
			fillShape(ctx, pixelX, pixelY, radius, params.shape)
			ctx.strokeStyle = theme.gridOutlineColor
			strokeShape(ctx, pixelX, pixelY, radius, params.shape)
		}
	},

	boardMoveCaptures: (params: BoardDrawingParams, calculationResults: moveCalculationResult[]) => {
		const { cellWidth, ctx } = params
		const radius = cellWidth / 2
		calculationResults.forEach((result: moveCalculationResult) => {
			const [moveX, moveY] = getCenterCoords(result.landing[0], result.landing[1], radius, params.shape)
			drawCircle(ctx, moveX, moveY, radius * 0.75)
			if (result.capturing) {
				const [captureX, captureY] = getCenterCoords(result.capturing[0], result.capturing[1], radius, params.shape)
				if (!checkCoordinateEquality(result.landing, result.capturing)) {
					drawLine(ctx, moveX, moveY, captureX, captureY)
				}
				drawCross(ctx, captureX, captureY, radius * 0.75)
			}
		})
	},
	boardGame: (params: BoardDrawingParams, game: Game, theme = basic_theme) => {
		game.pieces.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = game.pieces.getInstancePiece(coordinate)
			if (instancePiece) {
				boardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team, theme)
			}
		})
	},

	boardInstance: (params: BoardDrawingParams, instance: Instance, theme = basic_theme) => {
		instance.piecesRecord.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = instance.piecesRecord.getInstancePiece(coordinate)
			if (instancePiece) {
				boardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team, theme)
			}
		})

	},

	boardPiece: (params: BoardDrawingParams, piece: Piece, location: coordinate, team: number, theme = basic_theme) => {
		boardDrawPiece(params, piece, location, team, theme)
	},
	boardPieces: (params: BoardDrawingParams, piecesRecord: InstancePieceMap, theme = basic_theme) => {
		piecesRecord.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = piecesRecord.getInstancePiece(coordinate)
			if (instancePiece) {
				boardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team, theme)
			}
		})
	}
}

const boardDrawPiece = (params: BoardDrawingParams, piece: Piece, location: coordinate, team: number, theme: theme) => {
	const { cellWidth, ctx } = params
	const radius = cellWidth / 2
	const [centerX, centerY] = getCenterCoords(location[0], location[1], radius, params.shape)
	// When we implement pieces having an image
	if (piece.image) {
		const image = new Image()
		image.src = piece.image
		ctx.drawImage(image, centerX - radius, centerY - radius, cellWidth, cellWidth)
	} else if (piece.name.length > 0) {
		drawLetter(ctx, centerX, centerY, radius, piece.name[0], theme.teamColors[team], theme.gridOutlineColor)
	}

}

function getCenterCoords(gridX: number, gridY: number, radius: number, shape: shape) {
	if (shape === 'rect') {
		return [gridX * radius * 2 + radius, gridY * radius * 2 + radius];
	} else if (shape === 'hex') {
		const pixelX = gridX * (Math.sqrt(3) * radius) + radius
		const pixelY = gridY * (3 * radius / 2) + radius
		const offset = gridY % 2 === 0 ? 0 : Math.sqrt(3) / 2 * radius
		return [pixelX + offset, pixelY]

	} else {
		return []
	}
}

function fillShape(ctx: CanvasRenderingContext2D, pixelX: number, pixelY: number, radius: number, shape: shape) {
	if (shape === 'rect') {
		ctx.fillRect(pixelX - radius, pixelY - radius, radius * 2, radius * 2)
		return
	} else if (shape === 'hex') {
		fillHexagon(ctx, pixelX, pixelY, radius);
		return
	}
}

function strokeShape(ctx: CanvasRenderingContext2D, pixelX: number, pixelY: number, radius: number, shape: shape) {
	if (shape === 'rect') {
		ctx.strokeRect(pixelX - radius, pixelY - radius, radius * 2, radius * 2)
		return
	} else if (shape === 'hex') {
		strokeHexagon(ctx, pixelX, pixelY, radius);
		return
	}
}

function fillHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
	ctx.beginPath();
	for (let i = 0; i < 6; i++) {
		const angle_deg = 60 * i - 30;
		const angle_rad = (Math.PI / 180) * angle_deg;
		const px = x + radius * Math.cos(angle_rad);
		const py = y + radius * Math.sin(angle_rad);

		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
	ctx.fill();
}
function strokeHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
	ctx.beginPath();
	for (let i = 0; i < 6; i++) {
		const angle_deg = 60 * i - 30;
		const angle_rad = (Math.PI / 180) * angle_deg;
		const px = x + radius * Math.cos(angle_rad);
		const py = y + radius * Math.sin(angle_rad);

		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
	ctx.stroke();
}


const drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
	ctx.fillStyle = "Green"
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Define the circle path
	ctx.fill();
}

const drawLine = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
	ctx.strokeStyle = "Red"
	ctx.lineWidth = 10
	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.stroke();
	ctx.lineWidth = 1
}




const drawCross = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
	ctx.fillStyle = "Red"
	const t = radius / 4;
	ctx.beginPath();
	ctx.moveTo(centerX - radius, centerY - radius + t);
	ctx.lineTo(centerX - radius + t, centerY - radius);
	ctx.lineTo(centerX, centerY - t);
	ctx.lineTo(centerX + radius - t, centerY - radius);
	ctx.lineTo(centerX + radius, centerY - radius + t);
	ctx.lineTo(centerX + t, centerY);
	ctx.lineTo(centerX + radius, centerY + radius - t);
	ctx.lineTo(centerX + radius - t, centerY + radius);
	ctx.lineTo(centerX, centerY + t);
	ctx.lineTo(centerX - radius + t, centerY + radius);
	ctx.lineTo(centerX - radius, centerY + radius - t);
	ctx.lineTo(centerX - t, centerY);

	ctx.closePath(); // Connects back to the first point
	ctx.fill();    // Only draws the border
}

const drawLetter = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, letter: string, teamColor: string, teamOutline: string) => {
	ctx.font = `${radius.toString()}px Arial`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = teamColor
	ctx.strokeStyle = teamOutline
	ctx.fillText(letter, centerX, centerY);
	if (radius > 10)
		ctx.strokeText(letter, centerX, centerY);
}


export { BoardDrawing }
export type { BoardDrawingFunction, BoardDrawingParams }
