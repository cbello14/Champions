import type { coordinate } from "@/features/boards/board";
import { BoardDrawing } from "@/types/boardDrawing.ts";
import type { BoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { Game } from "@/features/games/game";
import { type moveCalculationResult } from "@/types/moveCalculation";
import type { Piece } from "@/features/pieces/piece";
import { moveDirection } from "@/types/move";
import BoardGeneric from "./BoardGeneric";

type gameCreationActions = Piece | "erase" | "team" | null

const BoardGame = ({ cellWidth, game, setGame, onClickAction, numPlayer }:
	{ cellWidth: number; game: Game; setGame: (game: Game) => void; onClickAction: gameCreationActions; numPlayer: number }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (onClickAction && newSelected) {
			if (onClickAction === "team") {
				const pieceClicked = game.pieces.getInstancePiece(newSelected)
				if (pieceClicked) {
					//in here, have a +1 and modulus
					setGame(game.setTeam(newSelected, (pieceClicked.team + 1) % numPlayer))
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

	const drawingFunction = useCallback((params: BoardDrawingParams) => {
		BoardDrawing.boardColoring(params, undefined, selected);
		let moves: moveCalculationResult[] = []
		if (selected && !onClickAction) {
			const selectedPiece = game.pieces.getInstancePiece(selected)
			const direction = selectedPiece?.team === 1 ? moveDirection.up : moveDirection.down
			moves = game.calculateMoves(selected, direction)
		}
		BoardDrawing.boardSpecialTiles(params, game.board);
		BoardDrawing.boardMoveCaptures(params, moves)
		BoardDrawing.boardGame(params, game)
	}, [game, onClickAction, selected]);

	return (<BoardGeneric dimensions={game.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} shape={game.board.shape} />)
}

export default BoardGame
