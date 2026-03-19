import type { board, coordinate } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type game = {
	board: board,
	pieces: Record<coordinate, [piece, number]>
}

export type { game }
