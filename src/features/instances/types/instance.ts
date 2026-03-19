import type { coordinate, board } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type turn = number
type team = number

type instancePiece = {
    piece: piece,
    team: team
}

type info = {
	captured?: [coordinate, turn],
	hasMoved: boolean,
	movesMade: number,
}

type instance = {
	board: board,
	pieces: Map<coordinate, instancePiece>,
	data: Map<instancePiece, info>
}

export type { turn, info, instance }
