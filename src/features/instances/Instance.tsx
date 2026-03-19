import {Piece} from "@/features/pieces/Piece"
import {Board} from "@/features/boards/Board"
//import {Game} from "@/features/games/Game"
import type {info} from "@/features/instances/types/instance"

type pieces= Map<string,[Piece, Number]>


export class Instance{
    board: Board;
    piecesRecord: pieces //keys have got to be a string to be hashable
    data: Map<[Piece,number],info>
    constructor(b: Board, r:pieces, d:Map<[Piece,number],info> ){
       this.board=b
       this.piecesRecord=r
       this.data=d
    }

    static GenericCon(){ 
        return new Instance(Board.GenericCon(), new Map<string,[Piece, Number]>,
        new Map<[Piece,number],info> )
    }

}


