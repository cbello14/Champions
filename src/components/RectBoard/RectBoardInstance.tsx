
import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { checkCoordinateEquality, type coordinate } from "@/types/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { Instance } from "@/features/instances/instance";


const RectBoardInstance = ({ cellWidth, instance, currentTeam }:
	{ cellWidth: number; instance: Instance; currentTeam: number }) => {
	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (selected && newSelected) {
			const prevSelectedPiece = instance.piecesRecord.getInstancePiece(selected)
			if (prevSelectedPiece?.team === currentTeam) {
				const direction = prevSelectedPiece.team === 1 ? [1, 1] : [-1, -1]
				const gamePieces = [...instance.piecesRecord.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
				const blocked = [...gamePieces, ...instance.board.blocked]
				const moves = calculateMovesRect(prevSelectedPiece.piece, selected, instance.board.dimensions, blocked, direction, true)
				const selectedMove = moves.some((moveLocation: coordinate) => { return checkCoordinateEquality(moveLocation, selected) })
				if (selectedMove) {
					instance.piecesRecord.removeInstancePiece(selected)
					instance.piecesRecord.setInstancePiece(newSelected, prevSelectedPiece)
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
			const direction = selectedPiece?.team === 1 ? [1, 1] : [-1, -1]
			const gamePieces = [...instance.piecesRecord.getKeys()].filter((value): value is coordinate => (value[0] !== selected[0] || value[1] !== selected[1]))
			const blocked = [...gamePieces, ...instance.board.blocked]
			moves = selectedPiece ? calculateMovesRect(selectedPiece.piece, selected, instance.board.dimensions, blocked, direction, true) : [];
		}
		RectBoardDrawing.rectBoardMoveCaptures(params, moves, [])
		RectBoardDrawing.RectBoardInstance(params, instance)
	}, [instance, selected]);

	return (<RectBoardGeneric dimensions={[8, 8]} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardInstance
