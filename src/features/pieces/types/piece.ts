import type { move, moveVerbose } from './move'
import type { capture, captureVerbose } from './capture'

type piece = {
	name: string,
	moves: move[],
	captures: capture[],
}

type pieceVerbose = {
	name: string,
	moves: moveVerbose[],
	captures: captureVerbose[]
}

type pieceAlternative = {
	name: string,
	moves: [...[move, capture]]
}

type pieceAlternativeVerbose = {
	name: string,
	moves: [...[moveVerbose, captureVerbose]]
}

export type { piece, pieceVerbose, pieceAlternative, pieceAlternativeVerbose }
