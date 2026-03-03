type movementType = '~' | '$';
type movementTypeVerbose = 'jump' | 'slide';

type reflect = 'h' | 'v' | 'hv' | undefined
type reflectVerbose = 'horizontal' | 'vertical' | 'horizontal-vertical' | undefined

type initialMove = 'i' | undefined
type initialMoveVerbose = 'initial' | undefined

type capturing = 'c' | 'o'
type capturingVerbose = 'capture' | 'non-capture'

type moveAttributes = [movementType, reflect, initialMove, capturing]
type moveAttributesVerbose = [movementTypeVerbose, reflectVerbose, initialMoveVerbose, capturingVerbose]

type cardinalDirection = '>' | '<' | 'v' | '^'
type cardinalDirectionVerbose = 'right' | 'left' | 'down' | 'up'

type diagonalDirection = '/v' | '/^' | '\v' | '\\^'
type diagonalDirectionVerbose = 'down-left' | 'up-right' | 'down-right' | 'up-left'

type direction = cardinalDirection | diagonalDirection
type directionVerbose = cardinalDirectionVerbose | diagonalDirectionVerbose

// NOTE: UNFORTUNATELY THERE IS NO WAY TO REQUIRE THE TYPE ONLY ACCEPT NUMBERS > 0 SO WE NEED TO BUILD IN THIS ASSERTION OURSELVES WHEREVER IT IS USED
type distance = number | 'n'

type movement = [distance, direction]
type movementVerbose = [distance, directionVerbose]

type move = [moveAttributes, ...movement[]]
type moveVerbose = [moveAttributesVerbose, ...movementVerbose[]]

export type { movementType, movementTypeVerbose, reflect, reflectVerbose, initialMove, initialMoveVerbose, capturing, capturingVerbose, moveAttributes, moveAttributesVerbose, cardinalDirection, cardinalDirectionVerbose, diagonalDirection, diagonalDirectionVerbose, direction, directionVerbose, distance, movement, movementVerbose, move, moveVerbose }
