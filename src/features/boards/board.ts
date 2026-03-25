import type { shape, coordinate, BoardJSON } from "@/types/board";

export class Board {
	name: string
	shape: shape;
	dimensions: number[]
	blocked: coordinate[]
	constructor(n = "basic", shap: shape = 'rect', dim: number[] = [8, 8], b: coordinate[] = []) {
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
			name: this.name,
			shape: this.shape,
			dimensions: this.dimensions,
			blocked: this.blocked
		};
	}
	static fromJSON(data: BoardJSON): Board {
    return new Board(data.name, data.shape, data.dimensions, data.blocked);
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
