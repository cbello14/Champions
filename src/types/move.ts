type movementType = 'jump' | 'slide';
const moveMovementType: Record<string, movementType> = { jump: 'jump', slide: 'slide' }

type reflect = 'horizontal' | 'vertical' | 'horizontal-vertical' | 'none'
const moveReflect: Record<string, reflect> = { horizontal: 'horizontal', vertical: 'vertical', horizontalvertical: 'horizontal-vertical' }

interface moveAttributes { type: movementType, reflection: reflect, initialMove: permission, capturing: permission }

type cardinalDirection = 'right' | 'left' | 'down' | 'up'

type diagonalDirection = 'down-left' | 'up-right' | 'down-right' | 'up-left'

type permission = 'required' | 'optional' | 'disabled'

const moveDirection: Record<string, direction> = { right: 'right', left: 'left', down: 'down', up: 'up', downleft: 'down-left', downright: 'down-right', upleft: 'up-left', upright: 'up-right' }

type direction = cardinalDirection | diagonalDirection

// NOTE: UNFORTUNATELY THERE IS NO WAY TO REQUIRE THE TYPE ONLY ACCEPT NUMBERS > 0 SO WE NEED TO BUILD IN THIS ASSERTION OURSELVES WHEREVER IT IS USED
type distance = number

interface movement { distance: distance, direction: direction }

interface move { attributes: moveAttributes, movements: movement[] }

export type { movementType, reflect, moveAttributes, cardinalDirection, diagonalDirection, direction, distance, movement, move, permission }
export { moveReflect, moveDirection, moveMovementType }
