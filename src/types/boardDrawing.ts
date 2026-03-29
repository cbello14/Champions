import { type dimension, type coordinate, checkCoordinateEquality } from "@/features/boards/board"
import type { Game } from "@/features/games/game"
import type { Instance } from "@/features/instances/instance"
import type { Piece } from "@/features/pieces/piece"
import type { InstancePieceMap } from "./instancePiece"
import type { moveCalculationResult } from "./moveCalculation"

interface RectBoardDrawingParams { boardSize: dimension, cellWidth: number, ctx: CanvasRenderingContext2D }
type RectBoardDrawingFunction = (params: RectBoardDrawingParams) => void

const RectBoardDrawing = {
	rectBoardColoring: (params: RectBoardDrawingParams, primaryColor: string, alternateColor: string, selectedCell: coordinate | null, selectedColor?: string, outlineColor?: string) => {
		const { boardSize, cellWidth, ctx } = params
		for (let gridX = 0; gridX < boardSize[0]; gridX++) {
			for (let gridY = 0; gridY < boardSize[1]; gridY++) {
				const pixelX = gridX * cellWidth
				const pixelY = gridY * cellWidth
				ctx.fillStyle = (gridX + gridY) % 2 === 0 ? primaryColor : alternateColor
				ctx.fillStyle = !!selectedCell && selectedCell[0] === gridX && selectedCell[1] === gridY && selectedColor ? selectedColor : ctx.fillStyle
				ctx.fillRect(pixelX, pixelY, cellWidth, cellWidth)
				if (outlineColor) { ctx.strokeStyle = outlineColor; ctx.strokeRect(pixelX, pixelY, cellWidth, cellWidth) }
			}
		}
	},

	rectBoardMoveCaptures: (params: RectBoardDrawingParams, calculationResults: moveCalculationResult[]) => {
		const { cellWidth, ctx } = params
		const radius = cellWidth / 2
		calculationResults.forEach((result: moveCalculationResult) => {
			ctx.fillStyle = "Green"
			const moveX = result.landing[0] * cellWidth + radius
			const moveY = result.landing[1] * cellWidth + radius
			drawCircle(ctx, moveX, moveY, radius)
			if (result.capturing) {
				ctx.fillStyle = "Red"
				const captureX = result.capturing[0] * cellWidth + radius
				const captureY = result.capturing[1] * cellWidth + radius
				if (!checkCoordinateEquality(result.landing, result.capturing)) {
					ctx.lineWidth = 10
					drawLine(ctx, moveX, moveY, captureX, captureY)
				}
				drawCross(ctx, captureX, captureY, radius)
			}
		})
	},


	rectBoardGame: (params: RectBoardDrawingParams, game: Game) => {
		game.pieces.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = game.pieces.getInstancePiece(coordinate)
			if (instancePiece) {
				rectBoardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team)
			}
		})
	},

	RectBoardInstance: (params: RectBoardDrawingParams, instance: Instance) => {
		instance.piecesRecord.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = instance.piecesRecord.getInstancePiece(coordinate)
			if (instancePiece) {
				rectBoardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team)
			}
		})

	},

	rectBoardPiece: (params: RectBoardDrawingParams, piece: Piece, location: coordinate, team: number) => {
		rectBoardDrawPiece(params, piece, location, team)
	},
	rectBoardPieces: (params: RectBoardDrawingParams, piecesRecord: InstancePieceMap) => {
		piecesRecord.getKeys().forEach((coordinate: coordinate) => {
			const instancePiece = piecesRecord.getInstancePiece(coordinate)
			if (instancePiece) {
				rectBoardDrawPiece(params, instancePiece.piece, coordinate, instancePiece.team)
			}
		})
	}
}

const drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Define the circle path
	ctx.fill();
}

const drawLine = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.stroke();
}

const rectBoardDrawPiece = (params: RectBoardDrawingParams, piece: Piece, location: coordinate, team: number) => {
	const { cellWidth, ctx } = params
	const pixelX = location[0] * cellWidth
	const pixelY = location[1] * cellWidth
	const radius = cellWidth / 2
	const centerX = pixelX + radius
	const centerY = pixelY + radius
	const teamColor = team === 1 ? 'white' : 'black'
	const teamOutline = team === 1 ? 'black' : 'white'
	// When we implement pieces having an image
	if (piece.image) {
		const image = new Image()
		image.src = piece.image
		ctx.drawImage(image, pixelX, pixelY, cellWidth, cellWidth)
	} else if (piece.name.length > 0) {
		drawLetter(ctx, centerX, centerY, radius, piece.name[0], teamColor, teamOutline)
	}

}
const drawCross = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
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
	ctx.strokeText(letter, centerX, centerY);
}


export { RectBoardDrawing }
export type { RectBoardDrawingFunction, RectBoardDrawingParams }
