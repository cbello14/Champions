import { Board } from "@/features/boards/board"
import { InstancePieceMap, type instancePiece, type instancePieceId, type InstancePieceMapJSON } from "@/types/instancePiece"
import type { coordinate } from "@/features/boards/board"
import type { BoardJSON } from "@/features/boards/board"

export type turn = number
export type team = number



export interface info {
	captured?: [coordinate, turn],
	hasMoved: boolean,
	movesMade: number,
}

export interface InstanceJSON {
	id: string,
	board: BoardJSON,
	piecesRecord: InstancePieceMapJSON,
	data: [instancePieceId, info][]
}

export class Instance {
	id: string
	board: Board
	piecesRecord: InstancePieceMap
	data: Map<instancePieceId, info>
	constructor(b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap(), d: Map<instancePieceId, info> = new Map<instancePieceId, info>(), id?: string) {
		this.id = id ?? crypto.randomUUID()
		this.board = b
		this.piecesRecord = r
		this.data = d
	}
	recordPieceMove(piece: instancePiece) {
		const pieceData = this.data.get(piece.id)
		if (!pieceData) {
			this.data.set(piece.id, { hasMoved: true, movesMade: 1 })
			return
		}
		this.data.set(piece.id, { hasMoved: true, movesMade: pieceData.movesMade + 1 })
	}
	hasPieceMoved(piece: instancePiece) {
		const pieceData = this.data.get(piece.id)
		if (!pieceData) {
			this.data.set(piece.id, { hasMoved: false, movesMade: 0 })
			return false
		}
		return pieceData.hasMoved
	}

	toJSON(): InstanceJSON {
		return {
			id: this.id,
			board: this.board.toJSON(),
			piecesRecord: this.piecesRecord.toJSON(),
			data: Array.from(this.data.entries())
		};
	}
	static fromJSON(data: InstanceJSON): Instance {
		const instanceData = new Map<instancePieceId, info>(data.data);
		return new Instance(
			Board.fromJSON(data.board),
			InstancePieceMap.fromJSON(data.piecesRecord),
			instanceData,
			data.id
		);
	}
}


