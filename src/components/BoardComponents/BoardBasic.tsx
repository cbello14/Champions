import { fullBlocker } from "@/features/tiles/defaultTiles";
import type { Board, coordinate } from "@/features/boards/board";
import { BoardDrawing } from "@/types/boardDrawing.ts";
import type { BoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";
import BoardGeneric from "./BoardGeneric";

type boardCreationActions = "tile" | null;

const BoardBasic = ({ dimensions, cellWidth, board, setBoard, onClickAction }:
	{ dimensions: number[]; cellWidth: number; board: Board; setBoard: (board: Board) => void; onClickAction: boardCreationActions }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => {
		if (onClickAction && newSelected) {
			// problem: specialTiles key is a [number, number] but doing [number, number] == [number, number] compares by reference not value
			const specialTilesArr = Array.from(board.specialTiles.entries());
			let found = false;
			for (const [coord] of specialTilesArr) {
				if (coord[0] == newSelected[0] && coord[1] == newSelected[1]) {
					found = true;
					break;
				}
			}
			if (found) {
				setBoard(board.removeTile(newSelected));
			} else {
				setBoard(board.addTile(newSelected, fullBlocker)); //HARD CODED: SHOULD CHANGE WHEN WE HAVE USER INPUTTED TILES IMPLEMENTED
			}
		}
		changeSelected(newSelected)
	}

	const drawingFunction = useCallback((params: BoardDrawingParams) => {
		BoardDrawing.boardColoring(params, undefined, selected );
		BoardDrawing.boardSpecialTiles(params, board);
	}, [board, selected]);


	return (<BoardGeneric shape={board.shape} dimensions={dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default BoardBasic
