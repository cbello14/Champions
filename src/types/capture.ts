import type { movement, movementVerbose } from "./move"

type capture = 'x' | '' | movement[]
type captureVerbose = 'direct' | 'no-capture' | movementVerbose[]

export type { capture, captureVerbose }


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