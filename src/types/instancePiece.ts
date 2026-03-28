import type { coordinateString, coordinate } from "@/features/boards/board";
import { coordinateToString, coordinateStringToCoordinate } from "@/features/boards/board";
import { Piece, type PieceJSON } from "@/features/pieces/piece";
import type { team } from "./team";

export type instancePieceId = number

export interface instancePiece {
	id: instancePieceId,
	piece: Piece,
	team: team
}

export interface InstancePieceJSON {
	id: instancePieceId,
	piece: PieceJSON,
	team: team
}

export type InstancePieceMapJSON = [coordinateString, InstancePieceJSON][];

export class InstancePieceMap {
	map: Map<coordinateString, instancePiece>
	private maxId: instancePieceId
	constructor(map: Map<coordinateString, instancePiece> = new Map<coordinateString, instancePiece>()) {
		this.map = map
		this.maxId = 0;
		[...this.map.entries()].forEach(([coordinateString, instancePiece]: [coordinateString, instancePiece]) => {
			if (instancePiece.id <= this.maxId) {
				const newId = this.maxId++
				instancePiece.id = newId;
				this.map.set(coordinateString, instancePiece)
				this.maxId = newId
			} else {
				this.maxId = instancePiece.id
			}

		})
	}
	getInstancePiece(coordinate: coordinate) {
		const coordinateString = coordinateToString(coordinate);
		return this.map.get(coordinateString);
	}
	setPiece(coordinate: coordinate, piece: Piece) {
		const coordinateString = coordinateToString(coordinate);
		const instance: instancePiece = {
			id: this.maxId + 1,
			piece: piece,
			team: 1
		}
		this.maxId++
		this.map.set(coordinateString, instance)
	};
	setInstancePiece(coordinate: coordinate, instancePiece: instancePiece) {
		const coordinateString = coordinateToString(coordinate);
		if (instancePiece.id <= this.maxId) {
			const newId = this.maxId++
			instancePiece.id = newId;
			this.maxId = newId
		} else {
			this.maxId = instancePiece.id
		}
		this.map.set(coordinateString, instancePiece)
	}
	removeInstancePiece(coordinate: coordinate) {
		const coordinateString = coordinateToString(coordinate)
		this.map.delete(coordinateString)
	}
	getKeys(): coordinate[] {
		return [...this.map.keys()]
			.map(coordString => coordinateStringToCoordinate(coordString))
			.filter((coord): coord is coordinate => coord !== null);
	};
	toJSON(): InstancePieceMapJSON {
		return Array.from(this.map.entries()).map(([coord, inst]) => [
			coord,
			{
				id: inst.id,
				piece: inst.piece.toJSON(),
				team: inst.team
			}
		]);
	}
	static fromJSON(data: InstancePieceMapJSON): InstancePieceMap {
		const map = new Map<coordinateString, instancePiece>(
			data.map(([coord, inst]: [string, InstancePieceJSON]) => [
				coord,
				{
					id: inst.id,
					piece: Piece.fromJSON(inst.piece),
					team: inst.team
				}
			])
		);
		return new InstancePieceMap(map);
	}
	clear() {
		this.map.clear()
	}
}
