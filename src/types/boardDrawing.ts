type RectBoardDrawingParams = { gridX: number, gridY: number, cellWidth: number, ctx: CanvasRenderingContext2D, selected?: boolean }
type RectBoardDrawingFunction = (params: RectBoardDrawingParams) => void

const RectBoardSkip = (_params: RectBoardDrawingParams) => { return }


const RectBoardColoring = (params: RectBoardDrawingParams, primaryColor: string, alternateColor: string, selectedColor: string, outlineColor?: string) => {
	const { gridX, gridY, cellWidth, ctx, selected } = params;
	const pixelX = gridX * cellWidth;
	const pixelY = gridY * cellWidth;
	ctx.fillStyle = (gridX + gridY) % 2 === 0 ? primaryColor : alternateColor
	if (selected) ctx.fillStyle = selectedColor
	ctx.fillRect(pixelX, pixelY, cellWidth, cellWidth)
	if (outlineColor) { ctx.strokeStyle = outlineColor; ctx.strokeRect(pixelX, pixelY, cellWidth, cellWidth) }
	ctx.strokeText(`${gridX} x ${gridY}`, pixelX, pixelY + cellWidth);
}


export { RectBoardColoring, RectBoardSkip }
export type { RectBoardDrawingFunction, RectBoardDrawingParams }
