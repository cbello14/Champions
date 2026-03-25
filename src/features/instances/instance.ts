import { Piece } from "@/features/pieces/piece"
import { Board } from "@/features/boards/board"
import type { info, instancePiece, InstanceJSON } from "@/types/instance"
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


