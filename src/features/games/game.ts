import { Board, checkCoordinateEquality, type BoardJSON } from "@/features/boards/board"
import { InstancePieceMap, type InstancePieceMapJSON } from "@/types/instancePiece";
import { Instance } from "../instances/instance";
import type { coordinate } from "@/features/boards/board";
import type { team } from "@/types/team";
import type { direction } from "@/types/move";
import { calculateMovesRect } from "@/types/moveCalculation";


export interface GameJSON {
	id: string
	name: string;
	board: BoardJSON,
	pieces: InstancePieceMapJSON
}

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
	getFriendlyPieces(team: team) {
		return this.pieces.getFriendlyPieces(team)
	}
	getEnemyPieces(team: team) {
		return this.pieces.getEnemyPieces(team)
	}
	calculateMoves(pieceLocation: coordinate, teamDirection: direction) {
		const piece = this.pieces.getInstancePiece(pieceLocation)
		if (!piece) {
			return []
		}
		const team = piece.team
		if (this.board.shape === 'rect') {
			const friendlyPieces = this.getFriendlyPieces(team).filter((coordinate) => !checkCoordinateEquality(coordinate, pieceLocation))
			const enemyPieces = this.getEnemyPieces(team)
			const blocked = [...friendlyPieces, ...this.board.blocked]
			return calculateMovesRect(piece.piece, pieceLocation, this.board.dimensions, blocked, enemyPieces, teamDirection, true)
		}
		return []
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
