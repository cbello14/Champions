import { checkCoordinateEquality, type coordinate } from "@/features/boards/board";
import { BoardDrawing } from "@/types/boardDrawing.ts";
import type { BoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import { type moveCalculationResult } from "@/types/moveCalculation";
import type { Instance } from "@/features/instances/instance";
import { moveDirection } from "@/types/move";
import BoardGeneric from "./BoardGeneric";


const BoardInstance = ({ cellWidth, instance, setInstance, currentTeam, nextTeam }:
	{ cellWidth: number; instance: Instance; setInstance: (instance: Instance) => void; currentTeam: number, nextTeam: () => void }) => {
	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (selected && newSelected) {
			const prevSelectedPiece = instance.piecesRecord.getInstancePiece(selected)
			if (prevSelectedPiece?.team === currentTeam) {
				const direction = directional(prevSelectedPiece.team)
				const moves = instance.calculateMoves(selected, direction)
				const selectedMove = moves.find((moveResult) => { return checkCoordinateEquality(moveResult.landing, newSelected) })
				if (selectedMove) {
					setInstance(instance.movePiece(selected, selectedMove))
					nextTeam()
					return
				}
			}
		}
		changeSelected(newSelected)
	}


	// made this into a callback because it was causing a issue with drawingFunction, would be better to figure out a different solution
	const directional = useCallback((teamNumber: number | undefined) => {
		if (!teamNumber)
			return moveDirection.down;
		switch (teamNumber) {
			case 1:
				return moveDirection.up;
			case 2:
				return moveDirection.right;
			case 3:
				return moveDirection.left;
			default:
				return moveDirection.down;
		}
	}, [])

	const drawingFunction = useCallback((params: BoardDrawingParams) => {
		BoardDrawing.boardColoring(params, undefined, selected);
		BoardDrawing.boardSpecialTiles(params, instance.board);
		let moves: moveCalculationResult[] = []
		if (selected) {
			const selectedPiece = instance.piecesRecord.getInstancePiece(selected)
			const direction = directional(selectedPiece?.team)
			moves = instance.calculateMoves(selected, direction)
		}
		BoardDrawing.boardMoveCaptures(params, moves)
		BoardDrawing.boardInstance(params, instance)
	}, [directional, instance, selected]);

	return (<BoardGeneric shape={instance.board.shape} dimensions={instance.board.dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default BoardInstance
