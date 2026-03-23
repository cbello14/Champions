import { Board } from "@/features/boards/board"
import type { info, instancePiece } from "@/types/instance"
import { InstancePieceMap } from "@/types/instancePieceMap"


export class Instance {
	board: Board;
	piecesRecord: InstancePieceMap
	data: Map<instancePiece, info>
	constructor(b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap(),
		d: Map<instancePiece, info> = new Map<instancePiece, info>()) {
		this.board = b
		this.piecesRecord = r
		this.data = d
	}

}


