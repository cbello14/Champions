//import {Piece} from "@/features/pieces/Piece"
import {Board} from "@/features/boards/Board"
//import {Game} from "@/features/games/Game"
import type {info,instancePiece} from "@/types/instance"
import type { coordinate } from "@/types/board"
import type {pieces} from "@/types/game"


export class Instance{
    board: Board;
    piecesRecord: pieces //keys have got to be a string to be hashable
    data: Map<instancePiece,info>
    constructor(b: Board= new Board(), r:pieces= new Map<coordinate,instancePiece>(),
     d:Map<instancePiece,info>=new Map<instancePiece,info>() ){
       this.board=b
       this.piecesRecord=r
       this.data=d
    }

}


