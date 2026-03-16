import RectBoardGeneric from "@/components/RectBoardGeneric"
import { rectBoardColoring, rectBoardSkip } from "@/types/boardDrawing"
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback } from "react";

const RectBoardBasic = ({ dimensions, cellWidth, primaryColor = "white", alternateColor = "black", selectedColor = "red", outlineColor }:
	{ dimensions: number[]; cellWidth: number; primaryColor?: string; alternateColor?: string; selectedColor?: string; outlineColor?: string }) => {
	const bottomLayer = useCallback((params: RectBoardDrawingParams) => {
		rectBoardColoring(params, primaryColor, alternateColor, selectedColor, outlineColor);
	}, [primaryColor, alternateColor, selectedColor, outlineColor]);


	return (<RectBoardGeneric dimensions={dimensions} cellWidth={cellWidth} bottomLayer={bottomLayer} middleLayer={rectBoardSkip} topLayer={rectBoardSkip} />)

}

export default RectBoardBasic
