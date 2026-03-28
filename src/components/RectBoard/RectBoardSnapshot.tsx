import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback } from "react";
import type { Board, coordinate } from "@/features/boards/board";
import type { InstancePieceMap } from "@/types/instancePiece";


const RectBoardSnapshot = ({ cellWidth, board, pieces }:
	{ cellWidth: number; board: Board, pieces?: InstancePieceMap }) => {

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	const ignoreSelected = (newSelected: coordinate | null) => { newSelected === null; return }

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "white", "black", null);
		if (pieces)
			RectBoardDrawing.rectBoardPieces(params, pieces)
	}, [pieces]);

	return (<RectBoardGeneric dimensions={board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={null} setSelected={ignoreSelected} />)

}

export default RectBoardSnapshot
