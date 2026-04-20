import type { coordinate } from "@/features/boards/board";
import { Piece } from "@/features/pieces/piece";
import { BoardDrawing, } from "@/types/boardDrawing.ts";
import type { BoardDrawingParams } from "@/types/boardDrawing.ts"
import type { moveCalculationResult } from "@/types/moveCalculation";
import { useCallback, useState } from "react";
import BoardGeneric from "./BoardGeneric";

const BoardPiece = ({ cellWidth, moves, captures, piece, location }:
	{ cellWidth: number; moves: coordinate[], captures: coordinate[], piece: Piece, location: coordinate }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	// TODO: create a move calculation method, that will provide us the proper captures for these moves even without there being pieces
	const moveResults: moveCalculationResult[] = moves.map((move, index) => { return { landing: move, capturing: captures[index] } })

	const drawingFunction = useCallback((params: BoardDrawingParams) => {
		BoardDrawing.boardColoring(params, undefined, selected);
		BoardDrawing.boardMoveCaptures(params, moveResults)
		BoardDrawing.boardPiece(params, piece, location, 1)
	}, [location, moveResults, piece, selected]);

	return (<BoardGeneric dimensions={[9, 9]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} shape={"rect"} />)

}

export default BoardPiece
