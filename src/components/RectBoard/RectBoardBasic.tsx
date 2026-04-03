import RectBoardGeneric from "@/components/RectBoard/RectBoardGeneric"
import { fullBlocker } from "@/features/tiles/defaultTiles";
import type { Board, coordinate } from "@/features/boards/board";
import { RectBoardDrawing } from "@/types/boardDrawing.ts";
import type { RectBoardDrawingParams } from "@/types/boardDrawing.ts"
import { useCallback, useState } from "react";

type boardCreationActions = "tile" | null;

const RectBoardBasic = ({ dimensions, cellWidth, primaryColor = "white", alternateColor = "black", selectedColor, outlineColor, board, setBoard, onClickAction }:
	{ dimensions: number[]; cellWidth: number; primaryColor?: string; alternateColor?: string; selectedColor?: string; outlineColor?: string; board: Board; setBoard: (board: Board) => void; onClickAction: boardCreationActions }) => {

	const [selected, changeSelected] = useState<coordinate | null>(null)

	const setSelected = (newSelected: coordinate | null) => { 
		if (onClickAction && newSelected) {
			if (onClickAction == "tile") {
				// problem: specialTiles key is a [number, number] but doing [number, number] == [number, number] compares by reference not value
				const specialTilesArr = Array.from(board.specialTiles.entries());
				let found = false;
				for (const [coord, _] of specialTilesArr) {
					if (coord[0] == newSelected[0] && coord[1] == newSelected[1]) {
						found = true;
						break;
					}
				}
				if (found) {
					console.log("call remove tile");
					const newBoard = board.removeTile(newSelected);
					console.log(newBoard.specialTiles);
					setBoard(board.removeTile(newSelected));
				} else {
					setBoard(board.addTile(newSelected, fullBlocker)); //HARD CODED: SHOULD CHANGE WHEN WE HAVE USER INPUTTED TILES IMPLEMENTED
				}
			}
		}
		console.log(board.specialTiles);
		changeSelected(newSelected) 
	}

	const drawingFunction = useCallback((params: RectBoardDrawingParams) => {
		RectBoardDrawing.rectBoardColoring(params, primaryColor, alternateColor, selected, selectedColor, outlineColor);
	}, [primaryColor, alternateColor, selectedColor, selected, outlineColor]);


	return (<RectBoardGeneric dimensions={dimensions} cellWidth={cellWidth} drawingFunction={drawingFunction} selected={selected} setSelected={setSelected} />)

}

export default RectBoardBasic
