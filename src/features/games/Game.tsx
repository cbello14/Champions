import {Piece} from "@/features/pieces/Piece"
import {Board} from "@/features/boards/Board"
import type {pieces} from "@/features/games/types/game"

export class Game{
    board: Board;
    piecesRecord: pieces //keys have got to be a string to be hashable
    constructor(b: Board, r:pieces ){
       this.board=b
       this.piecesRecord=r
    }

    static GenericCon(){ 
        return new Game(Board.GenericCon(),{coordinate:"null", piece:[new Piece(),-1]} )
    }
}