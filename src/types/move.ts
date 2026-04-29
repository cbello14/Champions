type MovementType = 'jump' | 'slide';
const moveMovementType: Record<string, MovementType> = { jump: 'jump', slide: 'slide' };

type Reflect = 'none' | 'horizontal' | 'vertical' | 'horizontal-vertical';
const moveReflect: Record<string, Reflect> = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  horizontalvertical: 'horizontal-vertical',
};

interface MoveAttributes {
  type: MovementType;
  reflection: Reflect;
  initialMove: Permission;
  capturing: Permission;
}

type CardinalDirection = 'right' | 'left' | 'down' | 'up';

type DiagonalDirection = 'down-left' | 'up-right' | 'down-right' | 'up-left';

type Permission = 'optional' | 'required' | 'disabled';

const moveDirection: Record<string, Direction> = {
  right: 'right',
  left: 'left',
  down: 'down',
  up: 'up',
  downleft: 'down-left',
  downright: 'down-right',
  upleft: 'up-left',
  upright: 'up-right',
};

type Direction = CardinalDirection | DiagonalDirection;

type Distance = number;

interface Movement {
  distance: Distance;
  direction: Direction;
}

interface Move {
  attributes: MoveAttributes;
  movements: Movement[];
}

export type {
  CardinalDirection,
  DiagonalDirection,
  Direction,
  Distance,
  Move,
  MoveAttributes,
  Movement,
  MovementType,
  Permission,
  Reflect,
};
export { moveDirection, moveMovementType, moveReflect };
