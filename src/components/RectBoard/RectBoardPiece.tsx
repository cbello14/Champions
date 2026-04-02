import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import type { coordinate } from "@/features/boards/board";
import { Piece } from "@/features/pieces/piece";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import type { moveCalculationResult } from "@/types/moveCalculation";
import { useCallback, useState } from "react";

const RectBoardPiece = ({ cellWidth, moves, captures, piece, location }:
	{ cellWidth: number; moves: coordinate[], captures: coordinate[], piece: Piece, location: coordinate }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	// TODO: create a move calculation method, that will provide us the proper captures for these moves even without there being pieces
	const moveResults: moveCalculationResult[] = moves.map((move, index) => { return { landing: move, capturing: captures[index] } })

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "tan", "green", selected);
		RectBoardDrawing.rectBoardMoveCaptures(params, moveResults)
		RectBoardDrawing.rectBoardPiece(params, piece, location, 1)
	}, [location, moveResults, piece, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardPiece
