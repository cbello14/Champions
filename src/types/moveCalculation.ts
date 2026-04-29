/* eslint-disable @typescript-eslint/no-use-before-define */
import { checkCoordinateArrayIncludes, checkCoordinateEquality } from '@/features/boards/board';

import { moveDirection, moveMovementType, moveReflect } from './move';
import { rectTeamDirection } from './team';

import type { Coordinate, Dimension } from '@/features/boards/board';
import type { Piece } from '@/features/pieces/piece';

import type { Capture } from './capture';
import type { Direction, Move, Movement, Permission } from './move';

export interface AttributeParams {
  isJump: boolean;
  flippedHorizontally: boolean;
  flippedVertically: boolean;
  captureType: Capture;
  requiresCapture: Permission;
}

export interface MoveCalculationResult {
  landing: Coordinate;
  capturing: Coordinate | null;
}

// unfortunately the code is pretty messy so comments are added for clariy (its really hard to write a chess move parser that calculates possible move locations along with capturing)
const calculateMovesRect = (
  piece: Piece,
  location: Coordinate,
  boardSize: Dimension,
  blocking: Coordinate[],
  enemyPieces: Coordinate[],
  teamDirection: Direction,
  isFirstMove: boolean
) => {
  // initialize our possible move array
  const possibleMoves: MoveCalculationResult[] = [];
  // iterate through each move in the array
  piece.moves.forEach((move: Move, index: number) => {
    const isJump = move.attributes.type === moveMovementType.jump;
    let blockingCoords = [...blocking];
    let enemyCoords = [...enemyPieces];
    if (move.attributes.initialMove === 'required' && !isFirstMove) {
      return;
    }
    if (move.attributes.initialMove === 'disabled' && isFirstMove) {
      return;
    }
    // if move isnt allowed to capture, or just cant, then enemypieces are blocking
    if (move.attributes.capturing === 'disabled' || piece.captures[index] === 'no-capture') {
      blockingCoords = blocking.concat(enemyPieces);
      enemyCoords = [];
    }
    const attributes = {
      isJump,
      flippedHorizontally: false,
      flippedVertically: false,
      captureType: move.attributes.capturing !== 'disabled' ? piece.captures[index] : 'no-capture',
      requiresCapture: move.attributes.capturing,
    };
    // run the move normally and add its moves to the results
    possibleMoves.push(
      ...calculateMoveRect(
        location,
        move,
        boardSize,
        blockingCoords,
        enemyCoords,
        attributes,
        teamDirection
      )
    );
    const horizontal = move.attributes.reflection === moveReflect.horizontal;
    const vertical = move.attributes.reflection === moveReflect.vertical;
    const horizontalvertical = move.attributes.reflection === moveReflect.horizontalvertical;
    // depending on possible reflections rerun the calculations with each type of reflection
    if (horizontal || horizontalvertical) {
      attributes.flippedVertically = false;
      attributes.flippedHorizontally = true;
      possibleMoves.push(
        ...calculateMoveRect(
          location,
          move,
          boardSize,
          blockingCoords,
          enemyCoords,
          attributes,
          teamDirection
        )
      );
    }
    if (vertical || horizontalvertical) {
      attributes.flippedVertically = true;
      attributes.flippedHorizontally = false;
      possibleMoves.push(
        ...calculateMoveRect(
          location,
          move,
          boardSize,
          blockingCoords,
          enemyCoords,
          attributes,
          teamDirection
        )
      );
    }
    if (horizontalvertical) {
      attributes.flippedVertically = true;
      attributes.flippedHorizontally = true;
      possibleMoves.push(
        ...calculateMoveRect(
          location,
          move,
          boardSize,
          blockingCoords,
          enemyCoords,
          attributes,
          teamDirection
        )
      );
    }
  });
  return possibleMoves;
};

const calculateMoveRect = (
  location: Coordinate,
  move: Move,
  boardSize: Dimension,
  blocking: Coordinate[],
  enemyPieces: Coordinate[],
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // if the move is a jump or a slide it requires different logic
  if (attributes.isJump) {
    return calculateMoveRectJump(
      location,
      move,
      boardSize,
      blocking,
      enemyPieces,
      attributes,
      teamDirection
    );
  }
  return calculateMoveRectNoJump(
    location,
    move,
    boardSize,
    blocking,
    enemyPieces,
    attributes,
    teamDirection
  );
};

// concept for maybe later - what if we do it when a king is taken instead?
// const checkCheckmate = () =>{
// 	//determines if a position is checkmate
// 	//how do we determine checkmate?
// 	//no matter what, the king is boned
// 	//2 parts
// 	//king moves
// 	//check all king moves, and if any piece on an opposing team can get them
//
// 	//get list of all king positions
//
// 	//not king moves
// 	//
//
//
// }

const calculateMoveRectJump = (
  location: Coordinate,
  move: Move,
  boardSize: Dimension,
  blocking: Coordinate[],
  enemyPieces: Coordinate[],
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // landing location is the final destionation of the jump
  let landingLocation: Coordinate = location;
  const result: MoveCalculationResult = { landing: [], capturing: null };
  // go through each individual movement and find where it will land, using where it lands to calculate the next movements starting position
  move.movements.forEach((movement: Movement) => {
    landingLocation = calculateMovementRectJump(
      landingLocation,
      movement,
      boardSize,
      attributes,
      teamDirection
    );
  });
  // add our final landing spot to our result
  result.landing = landingLocation;
  // check if the final landing spot landed in an invalid area, if so the entire move failed
  const landedOnBlocking = checkCoordinateArrayIncludes(blocking, landingLocation);
  const landedOutsideBoard = checkCoordInRectDim(landingLocation, boardSize);
  if (landedOnBlocking || landedOutsideBoard) {
    return [];
  }
  // if the move landed on an enemy, and our move captures what it lands on, add our landing spot as a thing to capture
  const landedOnEnemy = enemyPieces.some((enemyLoc) =>
    checkCoordinateEquality(enemyLoc, landingLocation)
  );
  if (landedOnEnemy && attributes.captureType === 'direct') {
    result.capturing = landingLocation;
  }
  // otherwise if capturing is a in a different spot, calculate that different spot and see if it captures
  if (Array.isArray(attributes.captureType)) {
    result.capturing = calculateCaptureMovement(
      landingLocation,
      attributes.captureType,
      boardSize,
      enemyPieces,
      attributes,
      teamDirection
    );
  }
  // if our move requires capturing but in the end nothing was captured the entire move failed
  if (result.capturing === null && attributes.requiresCapture === 'required') {
    return [];
  }
  return [result];
};

const calculateCaptureMovement = (
  location: Coordinate,
  movements: Movement[],
  boardSize: Dimension,
  enemyPieces: Coordinate[],
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // calculating capturing for different spots from where we land is basically jumping
  // calculate each movement using the end of the previous movement
  let landingLocation: Coordinate = location;
  movements.forEach((movement: Movement) => {
    landingLocation = calculateMovementRectJump(
      landingLocation,
      movement,
      boardSize,
      attributes,
      teamDirection
    );
  });
  // if landed out of bounds then return null
  const landedOutsideBoard = checkCoordInRectDim(landingLocation, boardSize);
  if (landedOutsideBoard) {
    return null;
  }
  // if landed on enemy return that spot, success
  const landedOnEnemy = checkCoordinateArrayIncludes(enemyPieces, landingLocation);
  if (landedOnEnemy) {
    // also check if the enemy is a king, if so, idk do something with it

    return landingLocation;
    // ASDF
  }
  // otherwise we failed for some other reason so return null
  return null;
};

const calculateMoveRectNoJump = (
  location: Coordinate,
  move: Move,
  boardSize: Dimension,
  blocking: Coordinate[],
  enemyPieces: Coordinate[],
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // calculating moves via sliding
  const possibleMoves: MoveCalculationResult[] = [];
  let startingLocation = location;
  // go through each movement, and take each spot it returns and it to our results
  move.movements.forEach((movement: Movement) => {
    // if starting location doesnt exist then something happened in the previous movement so stop
    if (!startingLocation.length) {
      return;
    }
    // get all the results from this movement
    const movements = calculateMovementRectNoJump(
      startingLocation,
      movement,
      boardSize,
      blocking,
      enemyPieces,
      attributes,
      teamDirection
    );
    // if there are no movements, something happened in the calculation so stop
    if (!movements.length) {
      return;
    }
    // add to the moves
    possibleMoves.push(...movements);
    // set the starting location of the next movement as the last location of this movement
    startingLocation = possibleMoves[possibleMoves.length - 1].landing;
  });
  return possibleMoves;
};

const calculateMovementRectNoJump = (
  location: Coordinate,
  movement: Movement,
  boardSize: Dimension,
  blocking: Coordinate[],
  enemyPieces: Coordinate[],
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // set up our return array
  const possibleMoves: MoveCalculationResult[] = [];
  const movementDirection = parseDirectionRect(
    movement.direction,
    teamDirection,
    attributes.flippedHorizontally,
    attributes.flippedVertically
  );
  // if our movement's distance is Infinity then set our distance equal to the largest dimension, otherwise just use the movement's distance
  const distance =
    movement.distance === Infinity ? Math.max(boardSize[0], boardSize[1]) : movement.distance;
  let prevLoc = location;
  // loop through all the spots in the direction of that distance
  for (let i = 0; i < distance; i += 1) {
    const result: MoveCalculationResult = { landing: [], capturing: null };
    // get the location of teh next move
    const nextLoc = sumRectCoords(prevLoc, movementDirection);
    // if we landed on an invalid spot or out of bounds, then our sliding is blocked so we stop
    const landedOnBlocking = checkCoordinateArrayIncludes(blocking, nextLoc);
    const landedOutsideBoard = checkCoordInRectDim(nextLoc, boardSize);
    if (landedOnBlocking || landedOutsideBoard) {
      break;
    }
    // otherwise this is a valid spot
    result.landing = nextLoc;
    // if we landed on an enemy and we capture the enemy we land on add it to our result and exit because we cant continue moving
    const landedOnEnemy = checkCoordinateArrayIncludes(enemyPieces, nextLoc);

    if (attributes.captureType === 'direct' && landedOnEnemy) {
      result.capturing = nextLoc;
      possibleMoves.push(result);
      break;
    }
    // if our capturing is on a different spot, see what that spot is
    else if (Array.isArray(attributes.captureType)) {
      result.capturing = calculateCaptureMovement(
        nextLoc,
        attributes.captureType,
        boardSize,
        enemyPieces,
        attributes,
        teamDirection
      );
    }
    // if we didnt capture anything but we need to capture something, dont include this spot to our results and exit
    if (result.capturing === null && attributes.requiresCapture === 'required') {
      break;
    }
    // otherwise add our result to our list and keep iterating
    possibleMoves.push(result);
    prevLoc = nextLoc;
  }
  return possibleMoves;
};

const calculateMovementRectJump = (
  location: Coordinate,
  movement: Movement,
  boardSize: Dimension,
  attributes: AttributeParams,
  teamDirection: Direction
) => {
  // start with our current direction
  let currentLocation: Coordinate = location;
  const movementDirection = parseDirectionRect(
    movement.direction,
    teamDirection,
    attributes.flippedHorizontally,
    attributes.flippedVertically
  );
  // set distance to be either the one given in movement, or the largest dim of the board if movement's is Infinity
  const distance =
    movement.distance === Infinity ? Math.max(boardSize[0], boardSize[1]) : movement.distance;
  for (let i = 0; i < distance; i += 1) {
    const prevLocation = currentLocation;
    currentLocation = sumRectCoords(currentLocation, movementDirection);
    // if our movement distance is Infinity and we just went out of bounds then just return the prevlocation which was still in bounds
    if (movement.distance === Infinity && checkCoordInRectDim(currentLocation, boardSize)) {
      return prevLocation;
    }
  }
  return currentLocation;
};

const parseDirectionRect = (
  direction: Direction,
  teamDirection: Direction,
  flippedHorizontally: boolean,
  flippedVertically: boolean
) => {
  let coordinateDirection;

  switch (direction) {
    case moveDirection.right:
      coordinateDirection = [1, 0];
      break;
    case moveDirection.left:
      coordinateDirection = [-1, 0];
      break;
    case moveDirection.down:
      coordinateDirection = [0, 1];
      break;
    case moveDirection.up:
      coordinateDirection = [0, -1];
      break;
    case moveDirection.downleft:
      coordinateDirection = [-1, 1];
      break;
    case moveDirection.upright:
      coordinateDirection = [1, -1];
      break;
    case moveDirection.downright:
      coordinateDirection = [1, 1];
      break;
    case moveDirection.upleft:
      coordinateDirection = [-1, -1];
      break;
    default:
      coordinateDirection = [0, 0];
  }
  coordinateDirection[0] *= flippedHorizontally ? -1 : 1;
  coordinateDirection[1] *= flippedVertically ? -1 : 1;
  return rectTeamDirection[teamDirection](coordinateDirection);
};

const checkCoordInRectDim = (coordinate: Coordinate, dimension: Dimension) =>
  coordinate[0] < 0 ||
  coordinate[1] < 0 ||
  coordinate[0] >= dimension[0] ||
  coordinate[1] >= dimension[1];

const sumRectCoords = (coordinateOne: Coordinate, coordinateTwo: Coordinate) => [
  coordinateOne[0] + coordinateTwo[0],
  coordinateOne[1] + coordinateTwo[1],
];

export { calculateMovesRect };
