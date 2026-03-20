import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { type coordinate } from "@/types/board";
import { rectBoardColoring, rectBoardMoveCaptures, rectBoardGame } from "@/types/boardDrawing"
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { Game } from "@/features/games/game";
import { calculateMovesRect } from "@/types/moveCalculation";

const RectBoardGame = ({ cellWidth, game }:
	{ cellWidth: number; game: Game }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { changeSelected(newSelected) }

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		rectBoardColoring(params, "white", "black", selected);
		let moves: coordinate[] = []
		if (selected) {
			const selectedPiece = game.getPiece(selected)
			const direction = selectedPiece?.team === 1 ? [1, 1] : [-1, -1]
			const gamePieces = [...game.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
			const blocked = [...gamePieces, ...game.getBoard().blocked]
			moves = selectedPiece ? calculateMovesRect(selectedPiece.piece, selected, game.getBoard().dimensions, blocked, direction, true) : [];
		}
		rectBoardMoveCaptures(params, moves, [])
		rectBoardGame(params, game)
	}, [game, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardGame
