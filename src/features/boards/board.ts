export type shape = 'rect' | 'tri' | 'hex'
export type dimension = number[]
export type coordinate = number[]
export type coordinateString = string

export interface BoardJSON {
	id: string
	name: string;
	shape: shape;
	dimensions: number[];
	blocked: coordinate[];
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
	readonly blocked: readonly coordinate[];

	constructor(n = "basic", shap: shape = 'rect', dim: readonly number[] = [8, 8], b: readonly coordinate[] = [], id?: string) {
		this.id = id ?? crypto.randomUUID();
		this.name = n;
		this.shape = shap;
		this.dimensions = dim;
		this.blocked = b;
	}
	addBlocked(coordinate: coordinate): Board {
		if (!this.isLocationValid(coordinate)) {
			return this;
		}
		return new Board(this.name, this.shape, this.dimensions, [...this.blocked, coordinate], this.id);
	}

	changeDimensions(newDimensions: readonly number[]): Board {
		const tempBoard = new Board(this.name, this.shape, newDimensions, [], this.id);
		const newBlocked = this.blocked.filter(cell => tempBoard.isLocationValid(cell));
		return new Board(this.name, this.shape, newDimensions, newBlocked, this.id);
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
			blocked: this.blocked.map(c => [...c])
		};
	}

	static fromJSON(data: BoardJSON): Board {
		return new Board(data.name, data.shape, data.dimensions, data.blocked, data.id);
	}
}
