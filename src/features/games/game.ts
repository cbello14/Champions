import { Board } from "@/features/boards/board"
import { InstancePieceMap } from "@/types/instancePieceMap";


export class Game {
	board: Board;
	pieces: InstancePieceMap //keys have got to be a string to be hashable
	constructor(b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap()) {
		this.board = b
		this.pieces = r
	}

}
