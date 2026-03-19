import type { coordinate} from "@/features/boards/types/board"
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

export type {turn,instancePiece,info}