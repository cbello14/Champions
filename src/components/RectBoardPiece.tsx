import RectBoardGeneric from "@/components/RectBoardGeneric"
import type { coordinate } from "@/features/boards/types/board";
import type { piece } from "@/features/pieces/types/piece";
import { rectBoardColoring, rectBoardMoveCaptures, rectBoardPiece } from "@/types/boardDrawing"
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback } from "react";

const RectBoardPiece = ({ cellWidth, moves, captures, piece, location }:
	{ cellWidth: number; moves: coordinate[], captures: coordinate[], piece: piece, location: coordinate }) => {

	const bottomLayer = useCallback((params: RectBoardDrawingParams) => {
		rectBoardColoring(params, "white", "black", "white");
	}, []);

	const middleLayer = useCallback((params: RectBoardDrawingParams) => {
		rectBoardMoveCaptures(params, moves, captures)
	}, [moves, captures]);

	const topLayer = useCallback((params: RectBoardDrawingParams) => {
		rectBoardPiece(params, piece, location)
	}, [location, piece])

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} bottomLayer={bottomLayer} middleLayer={middleLayer} topLayer={topLayer} />)

}

export default RectBoardPiece
