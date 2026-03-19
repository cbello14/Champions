import {Board} from "@/features/boards/Board"
import type { coordinate } from "@/types/board";
import type { instancePiece } from "@/types/instance";

export class Game{
    board: Board;
    pieces: Map<coordinate,instancePiece> //keys have got to be a string to be hashable
    constructor(b: Board=new Board(), r:Map<coordinate,instancePiece> =new Map<coordinate,instancePiece>() ){
       this.board=b
       this.pieces=r
    }

}