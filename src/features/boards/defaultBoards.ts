import { Board } from './board';

import type { Tile } from '@/features/tiles/tile';

import type { Coordinate } from './board';

export const basic: Board = new Board('Default', 'rect', [8, 8], new Map<Coordinate, Tile>());

export const wallTest: Board = new Board('Wall Test', 'rect', [3, 1], new Map<Coordinate, Tile>());
