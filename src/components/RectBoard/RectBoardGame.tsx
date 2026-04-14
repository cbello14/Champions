import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import type { coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { Game } from "@/features/games/game";
import { type moveCalculationResult } from "@/types/moveCalculation";
import type { Piece } from "@/features/pieces/piece";
import { moveDirection } from "@/types/move";

type gameCreationActions = Piece | "erase" | "team" | null

const RectBoardGame = ({ cellWidth, game, setGame, onClickAction, numPlayer }:
	{ cellWidth: number; game: Game; setGame: (game: Game) => void; onClickAction: gameCreationActions; numPlayer:number }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (onClickAction && newSelected) {
			if (onClickAction === "team") {
				const pieceClicked = game.pieces.getInstancePiece(newSelected)
				if (pieceClicked) {
					//in here, have a +1 and modulus
					setGame(game.setTeam(newSelected, (pieceClicked.team +1)% numPlayer))
					//setGame(game.setTeam(newSelected, pieceClicked.team === 0 ? 1 : 0))
				}
			} else if (onClickAction === "erase") {
				setGame(game.removeInstancePiece(newSelected))
			} else {
				setGame(game.addPiece(newSelected, onClickAction, 1))
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "tan", "blue", selected);
		let moves: moveCalculationResult[] = []
		if (selected && !onClickAction) {
			const selectedPiece = game.pieces.getInstancePiece(selected)
			const direction = selectedPiece?.team === 1 ? moveDirection.up : moveDirection.down
			moves = game.calculateMoves(selected, direction)
		}
		RectBoardDrawing.rectBoardSpecialTiles(params, game.board);
		RectBoardDrawing.rectBoardMoveCaptures(params, moves)
		RectBoardDrawing.rectBoardGame(params, game)
	}, [game, onClickAction, selected]);

	return (<RectBoardGeneric dimensions={game.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)
}

export default RectBoardGame
