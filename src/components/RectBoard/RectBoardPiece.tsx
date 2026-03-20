import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import type { coordinate } from "@/types/board";
import { Piece } from "@/features/pieces/piece";
import { rectBoardColoring, rectBoardMoveCaptures, rectBoardPiece } from "@/types/boardDrawing"
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";

const RectBoardPiece = ({ cellWidth, moves, captures, piece, location }:
	{ cellWidth: number; moves: coordinate[], captures: coordinate[], piece: Piece, location: coordinate }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		rectBoardColoring(params, "white", "black", selected);
		rectBoardMoveCaptures(params, moves, captures)
		rectBoardPiece(params, piece, location, 1)
	}, [captures, location, moves, piece, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardPiece
