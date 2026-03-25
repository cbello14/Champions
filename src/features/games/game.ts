import { Board } from "@/features/boards/board"
import { InstancePieceMap } from "@/types/instancePieceMap";
import type { GameJSON } from "@/types/game";

export class Game {
	name: string;
	board: Board;
	pieces: InstancePieceMap //keys have got to be a string to be hashable
	constructor(n: string, b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap()) {
		this.name = n;
		this.board = b
		this.pieces = r
	}

	toJSON() {
		return {
			name: this.name,
			board: this.board.toJSON(),
			pieces: this.pieces.toJSON()
		};
	}
	static fromJSON(data: GameJSON): Game {
		return new Game(data.name, Board.fromJSON(data.board), InstancePieceMap.fromJSON(data.pieces));
	}
}
