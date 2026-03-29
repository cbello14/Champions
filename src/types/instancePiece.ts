import type { coordinateString, coordinate } from "@/features/boards/board";
import { coordinateToString, coordinateStringToCoordinate } from "@/features/boards/board";
import { Piece, type PieceJSON } from "@/features/pieces/piece";
import type { team } from "./team";

export type instancePieceId = number;

export interface instancePiece {
	id: instancePieceId;
	piece: Piece;
	team: team;
}

export interface InstancePieceJSON {
	id: instancePieceId;
	piece: PieceJSON;
	team: team;
}

export type InstancePieceMapJSON = [coordinateString, InstancePieceJSON][];

export class InstancePieceMap {
	readonly map: ReadonlyMap<coordinateString, instancePiece>;
	readonly maxId: instancePieceId;
	constructor(map: ReadonlyMap<coordinateString, instancePiece> = new Map(), currentMaxId?: number) {
		if (currentMaxId !== undefined) {
			// if we are creating our map from a previous instance
			this.map = map;
			this.maxId = currentMaxId;
			return;
		}

		const newMap = new Map<coordinateString, instancePiece>();
		let calcMaxId = 0;

		for (const [coordStr, piece] of map.entries()) {
			if (piece.id <= calcMaxId) {
				calcMaxId++;
				newMap.set(coordStr, { ...piece, id: calcMaxId });
			} else {
				calcMaxId = piece.id;
				newMap.set(coordStr, piece);
			}
		}
		this.map = newMap;
		this.maxId = calcMaxId;
	}

	getInstancePiece(coordinate: coordinate) {
		const coordinateString = coordinateToString(coordinate);
		return this.map.get(coordinateString);
	}

	setPiece(coordinate: coordinate, piece: Piece, team: team): InstancePieceMap {
		const coordinateString = coordinateToString(coordinate);
		const newMap = new Map(this.map);
		const newId = this.maxId + 1;

		const instance: instancePiece = { id: newId, piece: piece, team: team };

		newMap.set(coordinateString, instance);
		return new InstancePieceMap(newMap, newId);
	}

	setInstancePiece(coordinate: coordinate, instancePiece: instancePiece): InstancePieceMap {
		const coordinateString = coordinateToString(coordinate);
		const newMap = new Map(this.map);

		let newMaxId = this.maxId;
		let newPiece = instancePiece;

		if (instancePiece.id <= this.maxId) {
			newMaxId++;
			newPiece = { ...instancePiece, id: newMaxId };
		} else {
			newMaxId = instancePiece.id;
		}

		newMap.set(coordinateString, newPiece);
		return new InstancePieceMap(newMap, newMaxId);
	}

	removeInstancePiece(coordinate: coordinate): InstancePieceMap {
		const coordinateString = coordinateToString(coordinate);
		const newMap = new Map(this.map);
		newMap.delete(coordinateString);
		return new InstancePieceMap(newMap, this.maxId);
	}

	getKeys(): coordinate[] {
		return [...this.map.keys()]
			.map(coordString => coordinateStringToCoordinate(coordString))
			.filter((coord): coord is coordinate => coord !== null);
	}

	getFriendlyPieces(team: team) {
		return this.getKeys().filter((value): value is coordinate => (this.getInstancePiece(value)?.team === team));
	}

	getEnemyPieces(team: team) {
		return this.getKeys().filter((value): value is coordinate => (this.getInstancePiece(value)?.team !== team));
	}

	toJSON(): InstancePieceMapJSON {
		return Array.from(this.map.entries()).map(([coord, inst]) => [coord, { id: inst.id, piece: inst.piece.toJSON(), team: inst.team }]);
	}

	static fromJSON(data: InstancePieceMapJSON): InstancePieceMap {
		const map = new Map<coordinateString, instancePiece>(
			data.map(([coord, inst]: [string, InstancePieceJSON]) => [coord, { id: inst.id, piece: Piece.fromJSON(inst.piece), team: inst.team }])
		);
		return new InstancePieceMap(map);
	}

	clear(): InstancePieceMap {
		return new InstancePieceMap();
	}
}
