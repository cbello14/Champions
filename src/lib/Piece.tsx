//I have made these seperate for future scaling - like sometimes this move captures sometimes it doesn't etc etc

export class Piece {
    name: string;
    moves: Move[];
    captures: Capture[];
    constructor(){
        this.name="pawn";
        var M1= Move.genericConstruct();
        var C1= Capture.genericConstruct();
        this.moves=[M1];
        this.captures=[C1];
    }
};

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


export class Move {
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


//takes either a move/capture data and outputs it in a human readable context
export function toReadableDirection(s:string){
    var splitted=s.split("|");
    //first part is jumping/sliding, reflections, initial, capture conditional
    var split1=splitted[0];
    console.log(split1);
}

//reverses it, shouldnt really be used?
//x and y should be integers, cannot have them both be 0
//TODO: maybe make this workable? very unclear
//might be good for turning user clicks into the shit we read
export function toParsableDirection(x: number,y:number){
    console.log(x+y);
}