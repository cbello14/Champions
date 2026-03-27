import type { coordinate } from "@/types/board"
import { Piece } from "@/features/pieces/piece"
import type { PieceJSON } from "@/types/piece"
import type { BoardJSON } from "@/types/board"
import type { InstancePieceMapJSON } from "./instancePieceMap"

type turn = number
type team = number
type instancePieceId = number

interface InstancePieceJSON {
	id: instancePieceId,
	piece: PieceJSON,
	team: team
}

interface instancePiece {
	id: instancePieceId,
	piece: Piece,
	team: team
}

interface info {
	captured?: [coordinate, turn],
	hasMoved: boolean,
	movesMade: number,
}

interface InstanceJSON {
	id: string,
	board: BoardJSON,
	piecesRecord: InstancePieceMapJSON,
	data: [instancePieceId, info][]
}

export type { turn, instancePiece, info, InstancePieceJSON, InstanceJSON, instancePieceId }
