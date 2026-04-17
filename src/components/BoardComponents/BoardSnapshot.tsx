import { BoardDrawing } from "@/types/boardDrawing.ts";
import type { BoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback } from "react";
import type { Board, coordinate } from "@/features/boards/board";
import type { InstancePieceMap } from "@/types/instancePiece";
import BoardGeneric from "./BoardGeneric";


const BoardSnapshot = ({ cellWidth, board, pieces }:
	{ cellWidth: number; board: Board, pieces?: InstancePieceMap }) => {

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	const ignoreSelected = (newSelected: coordinate | null) => { newSelected === null; return }

	const drawingFunction = useCallback((params: BoardDrawingParams) => {
		BoardDrawing.boardColoring(params, "tan", "blue", null);
		BoardDrawing.boardSpecialTiles(params, board);
		if (pieces)
			BoardDrawing.boardPieces(params, pieces)
	}, [board, pieces]);

	return (<BoardGeneric shape={board.shape} dimensions={board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={null} setSelected={ignoreSelected} />)

}

export default BoardSnapshot
