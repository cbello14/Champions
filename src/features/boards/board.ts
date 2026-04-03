import { Tile } from "@/features/tiles/tile"
import type { TileJSON } from "@/features/tiles/tile"

export type shape = 'rect' | 'tri' | 'hex'
export type dimension = number[]
export type coordinate = number[]
export type coordinateString = string

export interface BoardJSON {
	id: string
	name: string;
	shape: shape;
	dimensions: number[];
	specialTiles: [coordinate, TileJSON][];
	//blocked: coordinate[];
}

export const checkCoordinateEquality = (coordinateOne: coordinate, coordinateTwo: coordinate) => { return coordinateToString(coordinateOne) === coordinateToString(coordinateTwo) }
export const coordinateToString: (coordinate: coordinate) => coordinateString = (coordinate: coordinate) => { return JSON.stringify(coordinate) }
export const coordinateStringToCoordinate: (string: coordinateString) => coordinate | null = (string: coordinateString) => {
	// unfortunately necessary 
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
	const parsed: any = JSON.parse(string)
	if (Array.isArray(parsed) && parsed.every((item) => typeof item === "number")) {
		return parsed as coordinate
	} else {
		return null
	}
}

export const checkCoordinateArrayIncludes = (coordinateArray: coordinate[], coordinateToCheck: coordinate) => {
	return coordinateArray.some((coord) => checkCoordinateEquality(coord, coordinateToCheck))
}

export class Board {
	readonly id: string;
	readonly name: string;
	readonly shape: shape;
	readonly dimensions: readonly number[];
	readonly specialTiles: Map<coordinate, Tile>; //not sure if this not being readonly will cause security issues or whatever

	constructor(n = "basic", shap: shape = 'rect', dim: readonly number[] = [8, 8], t: Map<coordinate, Tile> = new Map<coordinate, Tile>(), id?: string) {
		this.id = id ?? crypto.randomUUID();
		this.name = n;
		this.shape = shap;
		this.dimensions = dim;
		this.specialTiles = t;
	}

	//NOTE: idk if maps copy by value or reference, if things break start here
	addTile(coordinate: coordinate, tile: Tile): Board {
		if (!this.isLocationValid(coordinate)) {
			return this;
		}
		const newTiles = this.specialTiles;
		newTiles.set(coordinate, tile);
		return new Board(this.name, this.shape, this.dimensions, newTiles, this.id);
	}

	changeDimensions(newDimensions: readonly number[]): Board {
		const tempBoard = new Board(this.name, this.shape, newDimensions);
		const newTiles = this.specialTiles;
		for (const coord of this.specialTiles.keys()) {
			if (tempBoard.isLocationValid(coord)) {
				newTiles.delete(coord);
			}
		}
		return new Board(this.name, this.shape, newDimensions, newTiles, this.id);
	}

	isLocationValid(location: coordinate): boolean {
		const outOfBounds = location.some((value, index) => value < 0 || value >= this.dimensions[index]);
		const wrongDimension = location.length !== this.dimensions.length;
		return !(outOfBounds || wrongDimension);
	}

	toJSON(): BoardJSON {
		return {
			id: this.id,
			name: this.name,
			shape: this.shape,
			dimensions: [...this.dimensions],
			specialTiles: Array.from(this.specialTiles.entries()).map(([c, t]) => [c, t.toJSON()])
			//blocked: this.blocked.map(c => [...c])
		};
	}

	static fromJSON(data: BoardJSON): Board {
		const specialTiles = new Map<coordinate, Tile>(data.specialTiles.map(([c, t]) => [c, Tile.fromJSON(t)]));
		return new Board(data.name, data.shape, data.dimensions, specialTiles, data.id);
		//return new Board(data.name, data.shape, data.dimensions, data.blocked, data.id);
	}
}
