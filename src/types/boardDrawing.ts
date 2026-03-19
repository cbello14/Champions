import { coordinateStringToCoordinate, type coordinate, type coordinateString, type dimension } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type RectBoardDrawingParams = { boardSize: dimension, cellWidth: number, ctx: CanvasRenderingContext2D }
type RectBoardDrawingFunction = (params: RectBoardDrawingParams) => void


const rectBoardColoring = (params: RectBoardDrawingParams, primaryColor: string, alternateColor: string, selectedCell: coordinate | null, selectedColor?: string, outlineColor?: string) => {
	const { boardSize, cellWidth, ctx } = params;
	for (let gridX = 0; gridX < boardSize[0]; gridX++) {
		for (let gridY = 0; gridY < boardSize[0]; gridY++) {
			const pixelX = gridX * cellWidth;
			const pixelY = gridY * cellWidth;
			ctx.fillStyle = (gridX + gridY) % 2 === 0 ? primaryColor : alternateColor
			ctx.fillStyle = !!selectedCell && selectedCell[0] === gridX && selectedCell[1] === gridY && selectedColor ? selectedColor : ctx.fillStyle
			ctx.fillRect(pixelX, pixelY, cellWidth, cellWidth)
			if (outlineColor) { ctx.strokeStyle = outlineColor; ctx.strokeRect(pixelX, pixelY, cellWidth, cellWidth) }
		}
	}
}

const rectBoardMoveCaptures = (params: RectBoardDrawingParams, moves: coordinate[], captures: coordinate[]) => {
	const { cellWidth, ctx } = params;
	const radius = cellWidth / 2;
	ctx.fillStyle = "Green";
	moves.forEach((move: dimension) => {
		const pixelX = move[0] * cellWidth + radius;
		const pixelY = move[1] * cellWidth + radius;
		drawCircle(ctx, pixelX, pixelY, radius);
	});
	ctx.fillStyle = "Red";
	captures.forEach((capture: dimension) => {
		const pixelX = capture[0] * cellWidth + radius;
		const pixelY = capture[1] * cellWidth + radius;
		drawCross(ctx, pixelX, pixelY, radius);
	})
}

const rectBoardPiece = (params: RectBoardDrawingParams, piece: piece, location: coordinate, team: number) => {
	const { cellWidth, ctx } = params;
	const pixelX = location[0] * cellWidth;
	const pixelY = location[1] * cellWidth;
	const radius = cellWidth / 2;
	const centerX = pixelX + radius;
	const centerY = pixelY + radius;
	const teamColor = team === 1 ? 'white' : 'black'
	const teamOutline = team === 1 ? 'black' : 'white'
	// When we implement pieces having an image
	if (piece.image) {
		ctx.drawImage(piece.image, pixelX, pixelY, cellWidth, cellWidth);
	} else {
		drawLetter(ctx, centerX, centerY, radius, piece.name[0], teamColor, teamOutline)
	}

}

const rectBoardPieces = (params: RectBoardDrawingParams, pieces: Map<coordinateString, [piece, number]>) => {
	const { cellWidth, ctx } = params;
	pieces.forEach(([piece, team], locationString: coordinateString) => {
		const location = coordinateStringToCoordinate(locationString);
		if (!location) {
			return
		}
		const pixelX = location[0] * cellWidth;
		const pixelY = location[1] * cellWidth;
		const radius = cellWidth / 2;
		const centerX = pixelX + radius;
		const centerY = pixelY + radius;
		const teamColor = team === 1 ? 'white' : 'black'
		const teamOutline = team === 1 ? 'black' : 'white'
		// When we implement pieces having an image
		if (piece.image) {
			ctx.drawImage(piece.image, pixelX, pixelY, cellWidth, cellWidth);
		} else {
			drawLetter(ctx, centerX, centerY, radius, piece.name[0], teamColor, teamOutline)
		}
	})

}

const drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Define the circle path
	ctx.fill();
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


export { rectBoardColoring, rectBoardMoveCaptures, rectBoardPiece, rectBoardPieces }
export type { RectBoardDrawingFunction, RectBoardDrawingParams }
