import { Piece } from "@/features/pieces/piece";
import { type movement, type move, type direction, moveReflect, moveDirection, moveMovementType } from "./move";
import type { coordinate, dimension } from "@/features/boards/board";
import { rectTeamDirection } from "./team";

interface attributeParams { isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean }

const calculateMovesRect = (piece: Piece, location: coordinate, boardSize: dimension, blocking: coordinate[], teamDirection: direction, isFirstMove: boolean) => {
	const possibleMoves: coordinate[] = [];
	piece.moves.forEach((move: move) => {
		const isJump = move.attributes.type ===  moveMovementType.jump
		const requiresFirstMove = !!move.attributes.initialMove
		if (requiresFirstMove && !isFirstMove) {
			return;
		}
		const attributes = { isJump: isJump, flippedHorizontally: false, flippedVertically: false };
		possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		const horizontal = move.attributes.reflection === moveReflect.horizontal
		const vertical = move.attributes.reflection === moveReflect.vertical
		const horizontalvertical = move.attributes.reflection === moveReflect.horizontalvertical
		if (horizontal || horizontalvertical) {
			attributes.flippedVertically = false;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}
		if (vertical || horizontalvertical) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = false;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}
		if (horizontalvertical) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blocking, attributes, teamDirection));
		}

	});
	return possibleMoves;
}

const calculateMoveRect = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	if (attributes.isJump) {
		return calculateMoveRectJump(location, move, boardSize, blocking, attributes, teamDirection)
	} else {
		return calculateMoveRectNoJump(location, move, boardSize, blocking, attributes, teamDirection)
	}
}

const calculateMoveRectJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: direction) => {
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

const calculateMoveRectNoJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: direction) => {
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

const calculateMovementRectNoJump = (location: coordinate, movement: movement, boardSize: dimension, blocking: coordinate[], attributes: attributeParams, teamDirection: direction) => {
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

const calculateMovementRectJump = (location: coordinate, movement: movement, boardSize: dimension, attributes: attributeParams, teamDirection: direction) => {
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

const parseDirectionRect = (direction: direction, teamDirection: direction) => {
	let coordinateDirection;

	switch (direction) {
		case moveDirection.right:
			coordinateDirection = [1, 0]
			break;
		case moveDirection.left:
			coordinateDirection = [-1, 0]
			break;
		case moveDirection.down:
			coordinateDirection = [0, 1]
			break;
		case moveDirection.up:
			coordinateDirection = [0, -1]
			break;
		case moveDirection.downleft:
			coordinateDirection = [-1, 1]
			break;
		case moveDirection.upright:
			coordinateDirection = [1, -1]
			break;
		case moveDirection.downright:
			coordinateDirection = [1, 1]
			break;
		case moveDirection.upleft:
			coordinateDirection = [-1, -1]
			break;
		default:
			coordinateDirection = [0, 0]
	}
	return rectTeamDirection[teamDirection](coordinateDirection);
}

export { calculateMovesRect }
