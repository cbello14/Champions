import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { checkCoordinateEquality, type coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { Instance } from "@/features/instances/instance";
import { moveDirection } from "@/types/move";


const RectBoardInstance = ({ cellWidth, instance, currentTeam, nextTeam }:
	{ cellWidth: number; instance: Instance; currentTeam: number, nextTeam: () => void }) => {
	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (selected && newSelected) {
			const prevSelectedPiece = instance.piecesRecord.getInstancePiece(selected)
			if (prevSelectedPiece?.team === currentTeam) {
				const direction = prevSelectedPiece.team === 1 ? moveDirection.up : moveDirection.down
				const gamePieces = [...instance.piecesRecord.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
				const blocked = [...gamePieces, ...instance.board.blocked]
				const moves = calculateMovesRect(prevSelectedPiece.piece, selected, instance.board.dimensions, blocked, direction, !instance.hasPieceMoved(prevSelectedPiece))
				const selectedMove = moves.some((moveLocation: coordinate) => { return checkCoordinateEquality(moveLocation, newSelected) })
				if (selectedMove) {
					instance.piecesRecord.removeInstancePiece(selected)
					instance.piecesRecord.setInstancePiece(newSelected, prevSelectedPiece)
					nextTeam()
					instance.recordPieceMove(prevSelectedPiece)
					changeSelected(null)
					return
				}
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "white", "black", selected);
		let moves: coordinate[] = []
		if (selected) {
			const selectedPiece = instance.piecesRecord.getInstancePiece(selected)
			const direction = selectedPiece?.team === 1 ? moveDirection.up : moveDirection.down
			const gamePieces = [...instance.piecesRecord.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
			const blocked = [...gamePieces, ...instance.board.blocked]
			moves = selectedPiece ? calculateMovesRect(selectedPiece.piece, selected, instance.board.dimensions, blocked, direction, !instance.hasPieceMoved(selectedPiece)) : [];
		}
		RectBoardDrawing.rectBoardMoveCaptures(params, moves, [])
		RectBoardDrawing.RectBoardInstance(params, instance)
	}, [instance, selected]);

	return (<RectBoardGeneric dimensions={instance.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardInstance
