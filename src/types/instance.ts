import type { coordinate } from "@/types/board"
import { Piece } from "@/features/pieces/piece"

type turn = number
type team = number

interface instancePiece {
	piece: Piece,
	team: team
}

interface info {
	captured?: [coordinate, turn],
	hasMoved: boolean,
	movesMade: number,
}

export type { turn, instancePiece, info }
