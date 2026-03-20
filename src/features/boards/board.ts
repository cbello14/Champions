import type { shape, coordinate } from "@/types/board";

export class Board {
	name: string
	shape: shape;
	dimensions: number[]
	blocked: coordinate[]
	constructor(n = "basic", shap: shape = 'rect', dim: [number, number] = [8, 8], b: coordinate[] = []) {
		this.name = n
		this.shape = shap
		this.dimensions = dim
		this.blocked = b
	}

}
