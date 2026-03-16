import type { coordinate, dimension } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type RectBoardDrawingParams = { gridX: number, gridY: number, cellWidth: number, ctx: CanvasRenderingContext2D, selected?: boolean }
type RectBoardDrawingFunction = (params: RectBoardDrawingParams) => void

const rectBoardSkip = (_params: RectBoardDrawingParams) => { return }

const rectBoardColoring = (params: RectBoardDrawingParams, primaryColor: string, alternateColor: string, selectedColor: string, outlineColor?: string) => {
	const { gridX, gridY, cellWidth, ctx, selected } = params;
	const pixelX = gridX * cellWidth;
	const pixelY = gridY * cellWidth;
	ctx.fillStyle = (gridX + gridY) % 2 === 0 ? primaryColor : alternateColor
	if (selected) ctx.fillStyle = selectedColor
	ctx.fillRect(pixelX, pixelY, cellWidth, cellWidth)
	if (outlineColor) { ctx.strokeStyle = outlineColor; ctx.strokeRect(pixelX, pixelY, cellWidth, cellWidth) }
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

const rectBoardPiece = (params: RectBoardDrawingParams, piece: piece, location: coordinate) => {
	const { gridX, gridY, cellWidth, ctx } = params;
	const pixelX = gridX * cellWidth;
	const pixelY = gridY * cellWidth;
	const radius = cellWidth / 2;
	const centerX = pixelX + radius;
	const centerY = pixelY + radius;

	if (gridX === location[0] && gridY === location[1]) {
		// When we implement pieces having an image
		if (piece.image) {
			ctx.drawImage(Image, pixelX, pixelY, cellWidth, cellWidth);
		} else {
			drawLetter(ctx, centerX, centerY, radius, piece.name[0])
		}
	}
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

const drawLetter = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, letter: string) => {
	ctx.font = `${radius.toString()}px Arial`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(letter, centerX, centerY);
}


export { rectBoardColoring, rectBoardSkip, rectBoardMoveCaptures, rectBoardPiece }
export type { RectBoardDrawingFunction, RectBoardDrawingParams }
