import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { checkCoordinateEquality, type coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { type moveCalculationResult } from "@/types/moveCalculation";
import type { Instance } from "@/features/instances/instance";
import { moveDirection } from "@/types/move";


const RectBoardInstance = ({ cellWidth, instance, setInstance, currentTeam, nextTeam }:
	{ cellWidth: number; instance: Instance; setInstance: (instance: Instance) => void; currentTeam: number, nextTeam: () => void }) => {
	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (selected && newSelected) {
			const prevSelectedPiece = instance.piecesRecord.getInstancePiece(selected)
			if (prevSelectedPiece?.team === currentTeam) {
				const direction = prevSelectedPiece.team === 1 ? moveDirection.up : moveDirection.down
				const moves = instance.calculateMoves(selected, direction)
				const selectedMove = moves.map((moveResult) => moveResult.landing).some((moveLocation: coordinate) => { return checkCoordinateEquality(moveLocation, newSelected) })
				if (selectedMove) {
					setInstance(instance.movePiece(selected, newSelected))
					nextTeam()
					return
				}
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, "tan", "green", selected);
		let moves: moveCalculationResult[] = []
		if (selected) {
			const selectedPiece = instance.piecesRecord.getInstancePiece(selected)
			const direction = selectedPiece?.team === 1 ? moveDirection.up : moveDirection.down
			moves = instance.calculateMoves(selected, direction)
		}
		RectBoardDrawing.rectBoardMoveCaptures(params, moves)
		RectBoardDrawing.RectBoardInstance(params, instance)
	}, [instance, selected]);

	return (<RectBoardGeneric dimensions={instance.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardInstance
