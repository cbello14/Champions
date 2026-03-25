import { Piece } from "@/features/pieces/piece"
import { Board } from "@/features/boards/board"
import type { info, instancePiece, InstanceJSON, instancePieceId } from "@/types/instance"
import { InstancePieceMap } from "@/types/instancePieceMap"

export class Instance {
	board: Board;
	piecesRecord: InstancePieceMap
	data: Map<instancePieceId, info>
	constructor(b: Board = new Board(), r: InstancePieceMap = new InstancePieceMap(),
		d: Map<instancePieceId, info> = new Map<instancePieceId, info>()) {
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
			board: this.board.toJSON(),
			piecesRecord: this.piecesRecord.toJSON(),
			data: Array.from(this.data.entries()).map(([inst, inf]) => [
							{
								piece: inst.piece.toJSON(),
								team: inst.team
							},
							inf
						])
		};
	}
	static fromJSON(data: InstanceJSON): Instance {
		const instanceData = new Map<instancePiece, info>(
			data.data.map(([keyJson, info]) => [
				{
					piece: Piece.fromJSON(keyJson.piece),
					team: keyJson.team
				},
				info
			])
		);

		return new Instance(
			Board.fromJSON(data.board),
			InstancePieceMap.fromJSON(data.piecesRecord),
			instanceData
		);
	}
}


