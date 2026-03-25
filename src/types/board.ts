type shape = 'rect' | 'tri' | 'hex'
type dimension = number[]
type coordinate = number[]
type coordinateString = string

interface BoardJSON {
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

export type { shape, dimension, coordinate, coordinateString, BoardJSON }
