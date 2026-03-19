import type { coordinate, dimension } from "@/features/boards/types/board";
import type { piece } from "./piece";
import type { movement, move, direction } from "./move";

type attributeParams = { isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean }

const calculateMovesRect = (piece: piece, location: coordinate, boardSize: dimension, blocking: coordinate[], teamDirection: coordinate, isFirstMove: boolean) => {
	console.log("Calculating moves for " + piece.name)
	const possibleMoves: coordinate[] = [];
	piece.moves.forEach((move: move) => {
		const isJump = move.attributes.type == '~'
		const requiresFirstMove = !!move.attributes.initialMove
		if (requiresFirstMove && !isFirstMove) {
			return;
		}
		const attributes = { isJump: isJump, flippedHorizontally: false, flippedVertically: false };
		possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		if (move.attributes.reflection?.includes('h')) {
			attributes.flippedVertically = false;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}
		if (move.attributes.reflection?.includes('v')) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = false;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}
		if (move.attributes.reflection?.includes('hv')) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}

	});
	return possibleMoves;
}

const calculateMoveRect = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: coordinate) => {
	// console.log("Calculating movements for " + JSON.stringify(move))
	let possibleMoves: coordinate[] = [];
	let startingLocation = location;
	move.movements.forEach((movement: movement) => {
		if (!startingLocation.length) {
			return;
		}
		const movements = calculateMovementRect(startingLocation, movement, boardSize, blocking, attributes, teamDirection)
		if (attributes.isJump) {
			possibleMoves = movements
		} else {
			possibleMoves.push(...movements);
		}
		startingLocation = possibleMoves[possibleMoves.length - 1]
	})
	// console.log("Possible locations for this move are" + JSON.stringify(possibleMoves))
	return possibleMoves;
}

const calculateMovementRect = (location: coordinate, movement: movement, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: coordinate) => {
	let possibleMoves: coordinate[] = [];
	const movementDirection = parseDirectionRect(movement.direction, teamDirection);
	if (attributes.flippedHorizontally) {
		movementDirection[0] *= -1;
	}
	if (attributes.flippedVertically) {
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
			if (attributes.isJump) {
				possibleMoves = []
			}
			break;
		}
		else if (blocking.includes(nextLoc)) {
			// on invalid spot 
			// console.log("Hit an invalid spot, nvm")
			if (attributes.isJump) {
				possibleMoves = []
			}
			break;
		}
		else {
			// console.log("Valid loc, adding to array")
			if (attributes.isJump) {
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

const parseDirectionRect = (direction: direction, teamDirection: coordinate) => {
	// top left corner is 0,0
	let coordinateDirection;

	switch (direction) {
		case '>':
			coordinateDirection = [1, 0]
			break;
		case '<':
			coordinateDirection = [-1, 0]
			break;
		case 'v':
			coordinateDirection = [0, 1]
			break;
		case '^':
			coordinateDirection = [0, -1]
			break;
		case '/v':
			coordinateDirection = [-1, 1]
			break;
		case '/^':
			coordinateDirection = [1, -1]
			break;
		case '\v':
			coordinateDirection = [1, 1]
			break;
		case '\\^':
			coordinateDirection = [-1, -1]
			break;
		default:
			coordinateDirection = [0, 0]
	}
	return [coordinateDirection[0] * teamDirection[0], coordinateDirection[1] * teamDirection[1]];
}

export { calculateMovesRect }
