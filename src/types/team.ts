import { moveDirection } from './move';

import type { Coordinate } from '@/features/boards/board';

export type Turn = number;
export type Team = number;
export type TeamDirection = (coordinate: Coordinate) => Coordinate;

export const rectTeamDirection: Record<string, TeamDirection> = {
  [moveDirection.up]: ([x, y]) => [x, y],
  [moveDirection.down]: ([x, y]) => [-x, -y],
  [moveDirection.right]: ([x, y]) => [-y, x],
  [moveDirection.left]: ([x, y]) => [y, -x],
  [moveDirection.upright]: ([x, y]) => [x - y, x + y],
  [moveDirection.downright]: ([x, y]) => [-y - x, x - y],
  [moveDirection.downleft]: ([x, y]) => [y - x, -x - y],
  [moveDirection.upleft]: ([x, y]) => [y + x, y - x],
};
