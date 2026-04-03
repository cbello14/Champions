import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import type { coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { Game } from "@/features/games/game";
import { type moveCalculationResult } from "@/types/moveCalculation";
import type { Piece } from "@/features/pieces/piece";
import type { team } from "@/types/team";

type gameCreationActions = Piece | "erase" | "team" | null

const RectBoardGame = ({ cellWidth, game, setGame, onClickAction }:
	{ cellWidth: number; game: Game; setGame: (game: Game) => void; onClickAction: gameCreationActions }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (onClickAction && newSelected) {
			if (onClickAction === "team") {
				const pieceClicked = game.pieces.getInstancePiece(newSelected)
				if (pieceClicked) {
					const teamIds = Object.keys(game.teams).map(Number).sort();
					for (let i = 0; i < teamIds.length; i++) {
						if (teamIds[i] == pieceClicked.team.teamId) {
							setGame(game.setTeam(newSelected, teamIds[(i + 1) % teamIds.length]));
							break;
						}
					}
				}
			} else if (onClickAction === "erase") {
				setGame(game.removeInstancePiece(newSelected))
			} else {
				const teamIds = Object.keys(game.teams).map(Number).sort();
				setGame(game.addPiece(newSelected, onClickAction, teamIds[0]))
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "white", "black", selected);
		let moves: moveCalculationResult[] = []
		if (selected && !onClickAction) {
			const selectedPiece = game.pieces.getInstancePiece(selected)
			if (selectedPiece) {
				moves = game.calculateMoves(selected, selectedPiece.team.direction)
			}
		}
		RectBoardDrawing.rectBoardMoveCaptures(params, moves)
		RectBoardDrawing.rectBoardGame(params, game)
	}, [game, onClickAction, selected]);

	return (<RectBoardGeneric dimensions={game.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)
}

export default RectBoardGame
