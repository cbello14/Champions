import type { coordinate, dimension } from "@/types/board";
import { Piece } from "@/features/pieces/piece";
import type { movement, move, direction } from "./move";

interface attributeParams { isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean }

const calculateMovesRect = (piece: Piece, location: coordinate, boardSize: dimension, blocking: coordinate[], teamDirection: coordinate, isFirstMove: boolean) => {
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
	if (attributes.isJump) {
		return calculateMoveRectJump(location, move, boardSize, blocking, attributes, teamDirection)
	} else {
		return calculateMoveRectNoJump(location, move, boardSize, blocking, attributes, teamDirection)
	}
}

const calculateMoveRectJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: coordinate) => {
	let landingLocation: coordinate = location;
	move.movements.forEach((movement: movement) => {
		landingLocation = calculateMovementRectJump(landingLocation, movement, boardSize, attributes, teamDirection)
	})
	if (blocking.some((blockedCoordinate) => blockedCoordinate[0] === landingLocation[0] && blockedCoordinate[1] === landingLocation[1])) {
		return [];
	} else if (
		landingLocation[0] < 0 || landingLocation[1] < 0 || landingLocation[0] >= boardSize[0] || landingLocation[1] >= boardSize[1]
	) {
		return [];
	}
	return [landingLocation];
}

const calculateMoveRectNoJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: coordinate) => {
	const possibleMoves: coordinate[] = [];
	let startingLocation = location;
	move.movements.forEach((movement: movement) => {
		if (!startingLocation.length) {
			return;
		}
		const movements = calculateMovementRectNoJump(startingLocation, movement, boardSize, blocking, attributes, teamDirection)
		possibleMoves.push(...movements);
		startingLocation = possibleMoves[possibleMoves.length - 1]
	})
	return possibleMoves;
}

const calculateMovementRectNoJump = (location: coordinate, movement: movement, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: coordinate) => {
	const possibleMoves: coordinate[] = [];
	const movementDirection = parseDirectionRect(movement.direction, teamDirection);
	movementDirection[0] *= attributes.flippedHorizontally ? -1 : 1
	movementDirection[1] *= attributes.flippedVertically ? -1 : 1
	const distance = movement.distance === 'n' ? Math.max(boardSize[0], boardSize[1]) : movement.distance
	let prevLoc = location;
	for (let i = 0; i < distance; i++) {
		const nextLoc = [prevLoc[0] + movementDirection[0], prevLoc[1] + movementDirection[1]];
		if (nextLoc[0] >= boardSize[0] || nextLoc[1] >= boardSize[1] || nextLoc[0] < 0 || nextLoc[1] < 0) {
			break;
		}
		else if (blocking.some((blockingCoordinate: coordinate) => blockingCoordinate[0] === nextLoc[0] && blockingCoordinate[1] === nextLoc[1])) {
			break;
		}
		possibleMoves.push(nextLoc);
		prevLoc = nextLoc;
	}
	return possibleMoves;
}

const calculateMovementRectJump = (location: coordinate, movement: movement, boardSize: dimension, attributes: attributeParams, teamDirection: coordinate) => {
	let currentLocation: coordinate = location;
	const movementDirection = parseDirectionRect(movement.direction, teamDirection);
	movementDirection[0] *= attributes.flippedHorizontally ? -1 : 1
	movementDirection[1] *= attributes.flippedVertically ? -1 : 1
	const distance = movement.distance === 'n' ? Math.max(boardSize[0], boardSize[1]) : movement.distance
	for (let i = 0; i < distance; i++) {
		currentLocation = [currentLocation[0] + movementDirection[0], currentLocation[1] + movementDirection[1]];
	}
	return currentLocation;

}

const parseDirectionRect = (direction: direction, teamDirection: coordinate) => {
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
