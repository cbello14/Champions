//I have made these seperate for future scaling - like sometimes this move captures sometimes it doesn't etc etc
import type {move} from "@/types/move"
import type { capture } from "@/types/capture";

export class Piece {
    name: string;
    image: string;//html
    moves: move[];
    captures: capture[];
    constructor(name:string="Pawn", image:string="", m:move[]=[], c:capture[]=[] ){
        this.name=name;
        this.image=image
        this.moves=m;
        this.captures=c;
    }

};

