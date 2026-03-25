import { Board } from "@/features/boards/board"
import type { coordinate } from "@/types/board";
import { InstancePieceMap } from "@/types/instancePieceMap";
import { Instance } from "../instances/instance";


export class Game {
	board: Board;
	pieces: InstancePieceMap //keys have got to be a string to be hashable
	constructor(b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap()) {
		this.board = b
		this.pieces = r
	}
	verifyPieces() {
		this.pieces.getKeys().forEach((coordinate: coordinate) => {
			if (!this.board.isLocationValid(coordinate)) { this.pieces.removeInstancePiece(coordinate) }
		})
	}
	createInstance() {
		const instance = new Instance(this.board, this.pieces)
		return instance
	}
}
