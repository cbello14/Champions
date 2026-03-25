import type { instancePiece, InstancePieceJSON } from "@/types/instance"
import { type coordinateString, coordinateStringToCoordinate, coordinateToString, type coordinate } from "@/types/board"
import type { Piece } from "@/features/pieces/piece";
import { Piece as PieceClass } from "@/features/pieces/piece";

export type InstancePieceMapJSON = [coordinateString, InstancePieceJSON][];

export class InstancePieceMap {
	map: Map<coordinateString, instancePiece>
	constructor(m: Map<coordinateString, instancePiece> = new Map<coordinateString, instancePiece>()) {
		this.map = m
	}
	getInstancePiece(coordinate: coordinate) {
		const coordinateString = coordinateToString(coordinate);
		return this.map.get(coordinateString);
	}
	setPiece(coordinate: coordinate, piece: Piece) {
		const coordinateString = coordinateToString(coordinate);
		const instance: instancePiece = {
			piece: piece,
			team: 1
		}
		this.map.set(coordinateString, instance)
	};
	setInstancePiece(coordinate: coordinate, instancePiece: instancePiece) {
		const coordinateString = coordinateToString(coordinate);
		this.map.set(coordinateString, instancePiece)
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
				piece: inst.piece.toJSON(),
				team: inst.team
			}
		]);
	}
	static fromJSON(data: InstancePieceMapJSON): InstancePieceMap {
		const map = new Map<coordinateString, instancePiece>(
			data.map(([coord, inst]) => [
				coord,
				{
					piece: PieceClass.fromJSON(inst.piece),
					team: inst.team
				}
			])
		);
		return new InstancePieceMap(map);
	}
}
