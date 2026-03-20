import type { coordinate} from "@/types/board"
import { Piece } from "@/features/pieces/piece"

type turn = number
type team = number

type instancePiece = {
    piece: Piece,
    team: team
}

type info = {
	captured?: [coordinate, turn],
	hasMoved: boolean,
	movesMade: number,
}

export type {turn,instancePiece,info}
