import type { direction, move, movement, moveVerbose } from './move'
import type { capture, captureVerbose } from './capture'
import type { coordinate, dimension } from '@/features/boards/types/board'

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


const calculateMovesRect = (piece: piece, location: coordinate, boardSize: dimension, blocking: coordinate[]) => {
	console.log("Calculating moves for " + piece.name)
	const possibleMoves: coordinate[] = [];
	piece.moves.forEach((move: move) => {
		const isJump = move.attributes.type == '~'
		possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, isJump, false, false));
		if (move.attributes.reflection?.includes('h')) {
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, isJump, true, false));
		}
		if (move.attributes.reflection?.includes('v')) {
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, isJump, false, true));
		}
		if (move.attributes.reflection?.includes('hv')) {
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, isJump, true, true));
		}

	});
	return possibleMoves;
}

const calculateMoveRect = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean) => {
	// console.log("Calculating movements for " + JSON.stringify(move))
	let possibleMoves: coordinate[] = [];
	let startingLocation = location;
	move.movements.forEach((movement: movement) => {
		if (startingLocation.length) {
			const movements = calculateMovementRect(startingLocation, movement, boardSize, blocking, isJump, flippedHorizontally, flippedVertically)
			if (isJump) {
				possibleMoves = movements
			} else {
				possibleMoves.push(...movements);
			}
			startingLocation = possibleMoves[possibleMoves.length - 1]
		}
	})
	// console.log("Possible locations for this move are" + JSON.stringify(possibleMoves))
	return possibleMoves;
}

const calculateMovementRect = (location: coordinate, movement: movement, boardSize: dimension, blocking: coordinate[], isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean) => {
	let possibleMoves: coordinate[] = [];
	const movementDirection = parseDirectionRect(movement.direction);
	if (flippedHorizontally) {
		movementDirection[0] *= -1;
	}
	if (flippedVertically) {
		movementDirection[1] *= -1;
	}
	const distance = movement.distance === 'n' ? Math.max(boardSize[0], boardSize[1]) : movement.distance
	let prevLoc = location;
	for (let i = 0; i < distance; i++) {
		const nextLoc = [prevLoc[0] + movementDirection[0], prevLoc[1] + movementDirection[1]];
		// console.log("Next location in this movement is " + JSON.stringify(nextLoc))
		if (nextLoc[0] >= boardSize[0] || nextLoc[1] >= boardSize[1] || nextLoc[0] < 0 || nextLoc[1] < 0) {
			// out of bounds
			// console.log("Went out of bounds nvm")
			if (isJump) {
				possibleMoves = []
			}
			break;
		}
		else if (blocking.includes(nextLoc)) {
			// on invalid spot 
			// console.log("Hit an invalid spot, nvm")
			if (isJump) {
				possibleMoves = []
			}
			break;
		}
		else {
			// console.log("Valid loc, adding to array")
			if (isJump) {
				possibleMoves[0] = nextLoc
			} else {
				possibleMoves.push(nextLoc);
			}
			prevLoc = nextLoc;
		}
	}
	// console.log("Possible locations for this movement are" + JSON.stringify(possibleMoves))
	return possibleMoves;

}

const parseDirectionRect = (direction: direction) => {
	// top left corner is 0,0
	switch (direction) {
		case '>':
			return [1, 0]
		case '<':
			return [-1, 0]
		case 'v':
			return [0, 1]
		case '^':
			return [0, -1]
		case '/v':
			return [-1, 1]
		case '/^':
			return [1, -1]
		case '\v':
			return [1, 1]
		case '\\^':
			return [-1, -1]
		default:
			return [0, 0]
	}
}

export { calculateMovesRect }
export type { piece, pieceVerbose, pieceAlternative, pieceAlternativeVerbose }
