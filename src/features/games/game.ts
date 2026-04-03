import { Board, checkCoordinateEquality, type BoardJSON } from "@/features/boards/board"
import { InstancePieceMap, type instancePiece, type InstancePieceMapJSON } from "@/types/instancePiece";
import { Instance } from "../instances/instance";
import type { coordinate } from "@/features/boards/board";
import type { team } from "@/types/team";
import { moveDirection, type direction } from "@/types/move";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { Piece } from "../pieces/piece";


export interface GameJSON {
	id: string
	name: string;
	board: BoardJSON,
	pieces: InstancePieceMapJSON,
	teams: Record<number, team>
}

export class Game {
	readonly id: string;
	readonly name: string;
	readonly board: Board;
	readonly pieces: InstancePieceMap;
	readonly teams: Record<number, team>;

	constructor(n: string, t: Record<number, team>, b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap(), id?: string) {
		this.id = id ?? crypto.randomUUID();
		this.name = n;
		this.board = b;
		this.pieces = r;
		this.teams = t;
	}
	movePiece(from: coordinate, to: coordinate) {
		const piece = this.pieces.getInstancePiece(from);

		if (!piece) {
			return this;
		}
		let newPieces = this.pieces
		newPieces = newPieces.removeInstancePiece(from);
		newPieces = newPieces.setPiece(to, piece.piece, piece.team);
		return new Game(this.name, this.teams, this.board, newPieces, this.id);
	}
	addTeam(color: string, direction: direction) {
		let newTeams = {...this.teams};
		const numTeams = Object.keys(newTeams).length;
		const nextId = numTeams > 0 ? Math.max(...Object.keys(newTeams).map(Number)) + 1 : 0;
		newTeams[nextId] = {teamId: nextId, color: color, direction: direction};
		return new Game(this.name, newTeams, this.board, this.pieces, this.id);
	}
	addPiece(coordinate: coordinate, piece: Piece, teamId: number) {
		let newPieces = this.pieces
		newPieces = newPieces.setPiece(coordinate, piece, this.teams[teamId])
		return new Game(this.name, this.teams, this.board, newPieces, this.id)
	}
	addInstancePiece(coordinate: coordinate, instancePiece: instancePiece) {
		let newPieces = this.pieces
		newPieces = newPieces.setInstancePiece(coordinate, instancePiece)
		return new Game(this.name, this.teams, this.board, newPieces, this.id)
	}
	removeTeam(teamId: number) {
		let newTeams = {...this.teams};
		const numTeams = Object.keys(newTeams).length;
		if (numTeams <= 1) {
			return this;
		}
		delete newTeams[teamId];

		let newPieces = this.pieces;
		const coords = newPieces.getKeys();
		for (const coord of coords) {
			if (newPieces.getInstancePiece(coord)?.team.teamId == teamId) {
				newPieces.removeInstancePiece(coord);
			}
		}
		return new Game(this.name, newTeams, this.board, this.pieces)
	}
	removeInstancePiece(coordinate: coordinate) {
		let newPieces = this.pieces
		newPieces = newPieces.removeInstancePiece(coordinate)
		return new Game(this.name, this.teams, this.board, newPieces, this.id)
	}
	setTeam(coordinate: coordinate, teamId: number) {
		let newPieces = this.pieces
		const piece = this.pieces.getInstancePiece(coordinate)
		if (!piece) {
			return this
		}
		piece.team = this.teams[teamId]
		newPieces = newPieces.removeInstancePiece(coordinate)
		newPieces = newPieces.setInstancePiece(coordinate, piece)
		return new Game(this.name, this.teams, this.board, newPieces, this.id)
	}
	getFriendlyPieces(team: team) {
		return this.pieces.getFriendlyPieces(team);
	}
	getEnemyPieces(team: team) {
		return this.pieces.getEnemyPieces(team);
	}
	calculateMoves(pieceLocation: coordinate, teamDirection: direction) {
		const piece = this.pieces.getInstancePiece(pieceLocation);
		if (!piece) return [];

		const team = piece.team;
		if (this.board.shape === 'rect') {
			const friendlyPieces = this.getFriendlyPieces(team).filter((coord) => !checkCoordinateEquality(coord, pieceLocation));
			const enemyPieces = this.getEnemyPieces(team);
			const blocked = [...friendlyPieces, ...this.board.blocked];
			return calculateMovesRect(piece.piece, pieceLocation, this.board.dimensions as number[], blocked as number[][], enemyPieces as number[][], teamDirection, true);
		}
		return [];
	}
	verifyPieces(): Game {
		let nextPieces = this.pieces;
		this.pieces.getKeys().forEach((coordinate: coordinate) => {
			if (!this.board.isLocationValid(coordinate)) {
				nextPieces = nextPieces.removeInstancePiece(coordinate);
			}
		});
		if (nextPieces === this.pieces) return this;
		return new Game(this.name, this.teams, this.board, nextPieces, this.id);
	}
	createInstance() {
		return new Instance(this.board, this.pieces);
	}
	toJSON(): GameJSON {
		return { id: this.id, name: this.name, board: this.board.toJSON(), pieces: this.pieces.toJSON(), teams: this.teams };
	}
	static fromJSON(data: GameJSON): Game {
		return new Game(data.name, data.teams, Board.fromJSON(data.board), InstancePieceMap.fromJSON(data.pieces), data.id);
	}
}
