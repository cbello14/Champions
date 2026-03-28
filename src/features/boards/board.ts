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
export class Board {
	id: string
	name: string
	shape: shape;
	dimensions: number[]
	blocked: coordinate[]
	constructor(n = "basic", shap: shape = 'rect', dim: number[] = [8, 8], b: coordinate[] = [], id?: string) {
		this.id = id ?? crypto.randomUUID()
		this.name = n
		this.shape = shap
		this.dimensions = dim
		this.blocked = b
	}
	addBlocked(coordinate: coordinate) {
		const outOfBounds = coordinate.some((value, index) => {
			const outOfBounds = value < 0 || value >= this.dimensions[index]
			return outOfBounds
		})
		const wrongDimension = coordinate.length != this.dimensions.length
		if (outOfBounds || wrongDimension) {
			return
		}
		this.blocked.push(coordinate)
	}
	changeDimensions(newDimensions: number[]) {
		this.dimensions = newDimensions
		const oldBlocked = this.blocked
		this.blocked = []
		oldBlocked.forEach((cell: coordinate) => { this.addBlocked(cell) })
	}
	toJSON(): BoardJSON {
		return {
			id: this.id,
			name: this.name,
			shape: this.shape,
			dimensions: this.dimensions,
			blocked: this.blocked
		};
	}
	static fromJSON(data: BoardJSON): Board {
		return new Board(data.name, data.shape, data.dimensions, data.blocked, data.id);
	}
	isLocationValid(location: coordinate) {
		const outOfBounds = location.some((value, index) => {
			const outOfBounds = value < 0 || value >= this.dimensions[index]
			return outOfBounds
		})
		const wrongDimension = location.length != this.dimensions.length
		if (outOfBounds || wrongDimension) {
			return false
		}
		return true
	}
}
