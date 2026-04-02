import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import type { coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";

const RectBoardBasic = ({ dimensions, cellWidth, primaryColor = "tan", alternateColor = "blue", selectedColor, outlineColor }:
	{ dimensions: number[]; cellWidth: number; primaryColor?: string; alternateColor?: string; selectedColor?: string; outlineColor?: string }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, primaryColor, alternateColor, selected, selectedColor, outlineColor);
	}, [primaryColor, alternateColor, selectedColor, selected, outlineColor]);


	return (<RectBoardGeneric dimensions={dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardBasic
