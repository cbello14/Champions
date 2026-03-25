import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { type coordinate } from "@/types/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { Game } from "@/features/games/game";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { Piece } from "@/features/pieces/piece";

type gameCreationActions = Piece | "erase" | "team" | null

const RectBoardGame = ({ cellWidth, game, onClickAction }:
	{ cellWidth: number; game: Game; onClickAction: gameCreationActions }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (onClickAction && newSelected) {
			if (onClickAction === "team") {
				const pieceClicked = game.pieces.getInstancePiece(newSelected)
				if (pieceClicked) {
					pieceClicked.team = pieceClicked.team === 0 ? 1 : 0
					game.pieces.setInstancePiece(newSelected, pieceClicked)
				}
			} else if (onClickAction === "erase") {
				game.pieces.removeInstancePiece(newSelected)
			} else {
				game.pieces.setPiece(newSelected, onClickAction)
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "white", "black", selected);
		let moves: coordinate[] = []
		if (selected && !onClickAction) {
			const selectedPiece = game.pieces.getInstancePiece(selected)
			const direction = selectedPiece?.team === 1 ? [1, 1] : [-1, -1]
			const gamePieces = [...game.pieces.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
			const blocked = [...gamePieces, ...game.board.blocked]
			moves = selectedPiece ? calculateMovesRect(selectedPiece.piece, selected, game.board.dimensions, blocked, direction, true) : [];
		}
		RectBoardDrawing.rectBoardMoveCaptures(params, moves, [])
		RectBoardDrawing.rectBoardGame(params, game)
	}, [game, onClickAction, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardGame
