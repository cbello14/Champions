import { Piece } from "@/features/pieces/piece";
import { type movement, type move, type direction, moveReflect, moveDirection, moveMovementType } from "./move";
import { checkCoordinateArrayIncludes, checkCoordinateEquality, type coordinate, type dimension } from "@/features/boards/board";
import { rectTeamDirection } from "./team";
import type { capture } from "./capture";

interface attributeParams { isJump: boolean, flippedHorizontally: boolean, flippedVertically: boolean, captureType: capture, requiresCapture?: boolean }

export interface moveCalculationResult { landing: coordinate, capturing: coordinate | null }

// unfortunately the code is pretty messy so comments are added for clariy (its really hard to write a chess move parser that calculates possible move locations along with capturing)
const calculateMovesRect = (piece: Piece, location: coordinate, boardSize: dimension, blocking: coordinate[], enemyPieces: coordinate[], teamDirection: direction, isFirstMove: boolean) => {
	// initialize our possible move array
	const possibleMoves: moveCalculationResult[] = [];
	// iterate through each move in the array
	piece.moves.forEach((move: move, index: number) => {
		const isJump = move.attributes.type === moveMovementType.jump
		const requiresFirstMove = !!move.attributes.initialMove
		let blockingCoords = [...blocking]
		let enemyCoords = [...enemyPieces]
		if (requiresFirstMove && !isFirstMove) {
			return;
		}
		// if move isnt allowed to capture, or just cant, then enemypieces are blocking
		if (move.attributes.capturing === false || piece.captures[index] === 'no-capture') {

			blockingCoords = blocking.concat(enemyPieces)
			enemyCoords = []
		}
		const attributes = { isJump: isJump, flippedHorizontally: false, flippedVertically: false, captureType: move.attributes.capturing !== false ? piece.captures[index] : 'no-capture', requiresCapture: move.attributes.capturing };
		// run the move normally and add its moves to the results
		possibleMoves.push(...calculateMoveRect(location, move, boardSize, blockingCoords, enemyCoords, attributes, teamDirection));
		const horizontal = move.attributes.reflection === moveReflect.horizontal
		const vertical = move.attributes.reflection === moveReflect.vertical
		const horizontalvertical = move.attributes.reflection === moveReflect.horizontalvertical
		// depending on possible reflections rerun the calculations with each type of reflection
		if (horizontal || horizontalvertical) {
			attributes.flippedVertically = false;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blockingCoords, enemyCoords, attributes, teamDirection));
		}
		if (vertical || horizontalvertical) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = false;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blockingCoords, enemyCoords, attributes, teamDirection));
		}
		if (horizontalvertical) {
			attributes.flippedVertically = true;
			attributes.flippedHorizontally = true;
			possibleMoves.push(...calculateMoveRect(location, move, boardSize, blockingCoords, enemyCoords, attributes, teamDirection));
		}

	});
	return possibleMoves;
}

const calculateMoveRect = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], enemyPieces: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	// if the move is a jump or a slide it requires different logic
	if (attributes.isJump) {
		return calculateMoveRectJump(location, move, boardSize, blocking, enemyPieces, attributes, teamDirection)
	} else {
		return calculateMoveRectNoJump(location, move, boardSize, blocking, enemyPieces, attributes, teamDirection)
	}
}


//concept for maybe later - what if we do it when a king is taken instead?
const checkCheckmate = () =>{
	//determines if a position is checkmate
	//how do we determine checkmate?
	//no matter what, the king is boned
	//2 parts
	//king moves
	//check all king moves, and if any piece on an opposing team can get them

	//get list of all king positions

	//not king moves
	//


}

const calculateMoveRectJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], enemyPieces: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	//landing location is the final destionation of the jump
	let landingLocation: coordinate = location;
	const result: moveCalculationResult = { landing: [], capturing: null }
	// go through each individual movement and find where it will land, using where it lands to calculate the next movements starting position
	move.movements.forEach((movement: movement) => {
		landingLocation = calculateMovementRectJump(landingLocation, movement, boardSize, attributes, teamDirection)
	})
	// add our final landing spot to our result
	result.landing = landingLocation
	// check if the final landing spot landed in an invalid area, if so the entire move failed
	const landedOnBlocking = checkCoordinateArrayIncludes(blocking, landingLocation)
	const landedOutsideBoard = checkCoordInRectDim(landingLocation, boardSize)
	if (landedOnBlocking || landedOutsideBoard) {
		return []
	}
	// if the move landed on an enemy, and our move captures what it lands on, add our landing spot as a thing to capture
	const landedOnEnemy = enemyPieces.some((enemyLoc) => checkCoordinateEquality(enemyLoc, landingLocation))
	if (landedOnEnemy && attributes.captureType === 'direct') {
		result.capturing = landingLocation
	}
	// otherwise if capturing is a in a different spot, calculate that different spot and see if it captures
	if (Array.isArray(attributes.captureType)) {
		result.capturing = calculateCaptureMovement(landingLocation, attributes.captureType, boardSize, enemyPieces, attributes, teamDirection)
	}
	// if our move requires capturing but in the end nothing was captured the entire move failed
	if (result.capturing === null && attributes.requiresCapture) {
		return []
	}
	return [result];
}

const calculateCaptureMovement = (location: coordinate, movements: movement[], boardSize: dimension, enemyPieces: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	// calculating capturing for different spots from where we land is basically jumping
	// calculate each movement using the end of the previous movement
	let landingLocation: coordinate = location;
	movements.forEach((movement: movement) => {
		landingLocation = calculateMovementRectJump(landingLocation, movement, boardSize, attributes, teamDirection)
	})
	// if landed out of bounds then return null
	const landedOutsideBoard = checkCoordInRectDim(landingLocation, boardSize)
	if (landedOutsideBoard) {
		return null
	}
	// if landed on enemy return that spot, success
	const landedOnEnemy = checkCoordinateArrayIncludes(enemyPieces, landingLocation)
	if (landedOnEnemy) {
		//also check if the enemy is a king, if so, idk do something with it
		
		return landingLocation
		//ASDF
	}
	//otherwise we failed for some other reason so return null
	return null
}

const calculateMoveRectNoJump = (location: coordinate, move: move, boardSize: dimension, blocking: coordinate[], enemyPieces: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	// calculating moves via sliding
	const possibleMoves: moveCalculationResult[] = [];
	let startingLocation = location;
	// go through each movement, and take each spot it returns and it to our results
	move.movements.forEach((movement: movement) => {
		// if starting location doesnt exist then something happened in the previous movement so stop
		if (!startingLocation.length) {
			return;
		}
		//get all the results from this movement
		const movements = calculateMovementRectNoJump(startingLocation, movement, boardSize, blocking, enemyPieces, attributes, teamDirection)
		// if there are no movements, something happened in the calculation so stop
		if (!movements.length) {
			return;
		}
		//add to the moves
		possibleMoves.push(...movements);
		//set the starting location of the next movement as the last location of this movement
		startingLocation = possibleMoves[possibleMoves.length - 1].landing
	})
	return possibleMoves;
}

const calculateMovementRectNoJump = (location: coordinate, movement: movement, boardSize: dimension, blocking: coordinate[], enemyPieces: coordinate[], attributes: attributeParams, teamDirection: direction) => {
	// set up our return array
	const possibleMoves: moveCalculationResult[] = [];
	const movementDirection = parseDirectionRect(movement.direction, teamDirection, attributes.flippedHorizontally, attributes.flippedVertically);
	// if our movement's distance is 'n' then set our distance equal to the largest dimension, otherwise just use the movement's distance
	const distance = movement.distance === 'n' ? Math.max(boardSize[0], boardSize[1]) : movement.distance
	let prevLoc = location;
	// loop through all the spots in the direction of that distance
	for (let i = 0; i < distance; i++) {
		const result: moveCalculationResult = { landing: [], capturing: null }
		// get the location of teh next move
		const nextLoc = sumRectCoords(prevLoc, movementDirection)
		// if we landed on an invalid spot or out of bounds, then our sliding is blocked so we stop
		const landedOnBlocking = checkCoordinateArrayIncludes(blocking, nextLoc)
		const landedOutsideBoard = checkCoordInRectDim(nextLoc, boardSize)
		if (landedOnBlocking || landedOutsideBoard) {
			break;
		}
		// otherwise this is a valid spot
		result.landing = nextLoc
		// if we landed on an enemy and we capture the enemy we land on add it to our result and exit because we cant continue moving
		const landedOnEnemy = checkCoordinateArrayIncludes(enemyPieces, nextLoc)

		if (attributes.captureType === 'direct' && landedOnEnemy) {
			result.capturing = nextLoc
			possibleMoves.push(result)
			break
		}
		// if our capturing is on a different spot, see what that spot is
		else if (Array.isArray(attributes.captureType)) {
			result.capturing = calculateCaptureMovement(nextLoc, attributes.captureType, boardSize, enemyPieces, attributes, teamDirection)
		}
		// if we didnt capture anything but we need to capture something, dont include this spot to our results and exit
		if (result.capturing === null && attributes.requiresCapture) {
			break
		}
		// otherwise add our result to our list and keep iterating
		possibleMoves.push(result)
		prevLoc = nextLoc;
	}
	return possibleMoves;
}

const calculateMovementRectJump = (location: coordinate, movement: movement, boardSize: dimension, attributes: attributeParams, teamDirection: direction) => {
	//start with our current direction
	let currentLocation: coordinate = location;
	const movementDirection = parseDirectionRect(movement.direction, teamDirection, attributes.flippedHorizontally, attributes.flippedVertically);
	// set distance to be either the one given in movement, or the largest dim of the board if movement's is n
	const distance = movement.distance === 'n' ? Math.max(boardSize[0], boardSize[1]) : movement.distance
	for (let i = 0; i < distance; i++) {
		const prevLocation = currentLocation
		currentLocation = sumRectCoords(currentLocation, movementDirection)
		// if our movement distance is 'inf' (n) and we just went out of bounds then just return the prevlocation which was still in bounds
		if (movement.distance === 'n' && checkCoordInRectDim(currentLocation, boardSize)) {
			return prevLocation
		}
	}
	return currentLocation;
}

const parseDirectionRect = (direction: direction, teamDirection: direction, flippedHorizontally: boolean, flippedVertically: boolean) => {
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
	coordinateDirection[0] *= flippedHorizontally ? -1 : 1
	coordinateDirection[1] *= flippedVertically ? -1 : 1
	return rectTeamDirection[teamDirection](coordinateDirection);
}

const checkCoordInRectDim = (coordinate: coordinate, dimension: dimension) => coordinate[0] < 0 || coordinate[1] < 0 || coordinate[0] >= dimension[0] || coordinate[1] >= dimension[1]

const sumRectCoords = (coordinateOne: coordinate, coordinateTwo: coordinate) => [coordinateOne[0] + coordinateTwo[0], coordinateOne[1] + coordinateTwo[1]]

export { calculateMovesRect }
