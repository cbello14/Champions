import { Board } from "@/features/boards/board"
import { coordinateStringToCoordinate, coordinateToString, type coordinate, type coordinateString } from "@/types/board";
import type { instancePiece } from "@/types/instance";
import type { Piece } from "../pieces/Piece";


export class Game {
	private board: Board;
	private pieces: Map<coordinateString, instancePiece> //keys have got to be a string to be hashable
	constructor(b: Board = new Board(), r: Map<coordinateString, instancePiece> = new Map<coordinateString, instancePiece>()) {
		this.board = b
		this.pieces = r
	}
	getPiece(coordinate: coordinate) {
		const coordinateString = coordinateToString(coordinate);
		return this.pieces.get(coordinateString);
	}
	setPiece(coordinate: coordinate, piece: Piece) {
		const coordinateString = coordinateToString(coordinate);
		const instance: instancePiece = {
			piece: piece,
			team: 1
		}
		this.pieces.set(coordinateString, instance)
	};
	setInstancePiece(coordinate: coordinate, instancePiece: instancePiece) {
		const coordinateString = coordinateToString(coordinate);
		this.pieces.set(coordinateString, instancePiece)
	}
	getKeys(): coordinate[] {
		return [...this.pieces.keys()]
			.map(coordString => coordinateStringToCoordinate(coordString))
			.filter((coord): coord is coordinate => coord !== null);
	};
	getBoard() {
		return this.board
	};
	clone(): Game {
		return new Game(this.board, new Map(this.pieces))
	}
	static hydrate(game: Game) {
		return new Game(game.board, new Map(game.pieces))
	}

}
