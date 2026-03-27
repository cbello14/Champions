import { Board } from "@/features/boards/board"
import type { coordinate } from "@/types/board";
import { InstancePieceMap } from "@/types/instancePieceMap";
import type { GameJSON } from "@/types/game";
import { Instance } from "../instances/instance";


export class Game {
	id: string
	name: string;
	board: Board;
	pieces: InstancePieceMap //keys have got to be a string to be hashable
	constructor(n: string, b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap(), id?: string) {
		this.id = id ?? crypto.randomUUID()
		this.name = n;
		this.board = b
		this.pieces = r
	}

	toJSON(): GameJSON {
		return {
			id: this.id,
			name: this.name,
			board: this.board.toJSON(),
			pieces: this.pieces.toJSON()
		};
	}
	static fromJSON(data: GameJSON): Game {
		return new Game(data.name, Board.fromJSON(data.board), InstancePieceMap.fromJSON(data.pieces), data.id);
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
