import { Board } from "@/features/boards/board"
import { InstancePieceMap } from "@/types/instancePieceMap";


export class Game {
	name: string;
	board: Board;
	pieces: InstancePieceMap //keys have got to be a string to be hashable
	constructor(n: string, b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap()) {
		this.name = n;
		this.board = b
		this.pieces = r
	}

}
