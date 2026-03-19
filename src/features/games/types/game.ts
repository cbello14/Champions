import type { board, coordinateString } from "@/features/boards/types/board"
import type { piece } from "@/features/pieces/types/piece"

type game = {
	board: board,
	pieces: Map<coordinateString, [piece, number]>
}

export type { game }
