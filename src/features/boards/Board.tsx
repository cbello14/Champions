import type { shape, coordinate } from "@/features/boards/types/board";

export class Board{
	name:string
    shape: shape;
    dimensions: number[]
    blocked: coordinate[]
    constructor(n:string, shap: shape, dim: [number,number], b: coordinate[]){
		this.name=n
        this.shape=shap
        this.dimensions= dim
        this.blocked= b
    }

    static GenericCon(){
        return new Board("basic",'rect',[8,8],[[]])
    }
}