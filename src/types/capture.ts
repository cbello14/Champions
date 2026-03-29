import type { movement } from "./move"

type capture = 'direct' | 'no-capture' | movement[]

export type { capture }


/*
Possible class version

export class Capture {
	direction: string;
	condition: boolean;
	static genericConstruct(){
		return new Move("$o|1^",true);
	}
	constructor(directions: string,conditions: boolean){
		this.direction=directions
		this.condition=conditions
	}
};

*/
