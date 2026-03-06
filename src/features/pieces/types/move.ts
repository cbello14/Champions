import type { coordinate } from "@/features/boards/types/board";

type movementType = '~' | '$';
type movementTypeVerbose = 'jump' | 'slide';

type reflect = 'h' | 'v' | 'hv' | undefined
type reflectVerbose = 'horizontal' | 'vertical' | 'horizontal-vertical' | undefined

type moveAttributes = { type: movementType, reflection?: reflect, initialMove?: boolean, capturing?: boolean }
type moveAttributesVerbose = { type: movementTypeVerbose, reflection?: reflectVerbose, initialMove?: boolean, capturing?: boolean }

type cardinalDirection = '>' | '<' | 'v' | '^'
type cardinalDirectionVerbose = 'right' | 'left' | 'down' | 'up'

type diagonalDirection = '/v' | '/^' | '\v' | '\\^'
type diagonalDirectionVerbose = 'down-left' | 'up-right' | 'down-right' | 'up-left'

type direction = cardinalDirection | diagonalDirection
type directionVerbose = cardinalDirectionVerbose | diagonalDirectionVerbose

// NOTE: UNFORTUNATELY THERE IS NO WAY TO REQUIRE THE TYPE ONLY ACCEPT NUMBERS > 0 SO WE NEED TO BUILD IN THIS ASSERTION OURSELVES WHEREVER IT IS USED
type distance = number | 'n'

type movement = { distance: distance, direction: direction }
type movementVerbose = { distance: distance, direction: directionVerbose }

type move = { attributes: moveAttributes, movement: movement[] }
type moveVerbose = { attributes: moveAttributesVerbose, movement: movementVerbose[] }

export type { movementType, movementTypeVerbose, reflect, reflectVerbose, moveAttributes, moveAttributesVerbose, cardinalDirection, cardinalDirectionVerbose, diagonalDirection, diagonalDirectionVerbose, direction, directionVerbose, distance, movement, movementVerbose, move, moveVerbose }
