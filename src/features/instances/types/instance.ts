import type { coordinate, board } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type turn = number

type info = {
	captured: undefined | [coordinate, turn],
	hasMoved: boolean,
	movesMode: number,
}

type instance = {
	board: board,
	pieces: Map<coordinate, [piece, number]>,
	data: Map<piece, info>
}

export type { turn, info, instance }
