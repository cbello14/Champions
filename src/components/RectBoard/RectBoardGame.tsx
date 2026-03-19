import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { coordinateStringToCoordinate, coordinateToString, type coordinate, type coordinateString } from "@/features/boards/types/board";
import { rectBoardColoring, rectBoardMoveCaptures, rectBoardPieces } from "@/types/boardDrawing"
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import type { game } from "@/features/games/types/game";
import { calculateMovesRect } from "@/features/pieces/types/moveCalculation";

const RectBoardGame = ({ cellWidth, game }:
	{ cellWidth: number; game: game }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		rectBoardColoring(params, "white", "black", selected);
		let moves: coordinate[] = []
		if (selected) {

			const stringLocation: coordinateString = coordinateToString(selected)
			const selectedPiece = game.pieces.get(stringLocation)
			const direction = selectedPiece && selectedPiece[1] === 1 ? [1, 1] : [-1, -1]
			const gamePieces = [...game.pieces.keys()].map((value) => coordinateStringToCoordinate(value)).filter((value) => value !== selected && value != null)
			const blocked = [...gamePieces, ...game.board.blocked].filter((location) => location != selected)
			moves = selectedPiece ? calculateMovesRect(selectedPiece[0], selected, game.board.dimension, blocked, direction, true) : [];
		}
		rectBoardMoveCaptures(params, moves, [])
		rectBoardPieces(params, game.pieces)
	}, [game.board.blocked, game.board.dimension, game.pieces, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardGame
