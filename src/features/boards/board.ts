import { Tile } from '@/features/tiles/tile';

import type { TileJSON } from '@/features/tiles/tile';

export type Shape = 'rect' | 'tri' | 'hex';
export type Dimension = number[];
export type Coordinate = number[];
export type CoordinateString = string;

export interface BoardJSON {
  id: string;
  name: string;
  shape: Shape;
  dimensions: number[];
  specialTiles: [Coordinate, TileJSON][];
  // blocked: coordinate[];
}

export const coordinateToString: (coordinate: Coordinate) => CoordinateString = (
  coordinate: Coordinate
) => JSON.stringify(coordinate);

export const checkCoordinateEquality = (coordinateOne: Coordinate, coordinateTwo: Coordinate) =>
  coordinateToString(coordinateOne) === coordinateToString(coordinateTwo);

export const coordinateStringToCoordinate: (string: CoordinateString) => Coordinate | null = (
  string: CoordinateString
) => {
  // unfortunately necessary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = JSON.parse(string);
  if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'number')) {
    return parsed;
  }
  return null;
};

export const checkCoordinateArrayIncludes = (
  coordinateArray: Coordinate[],
  coordinateToCheck: Coordinate
) => coordinateArray.some((coord) => checkCoordinateEquality(coord, coordinateToCheck));

export class Board {
  readonly id: string;

  readonly name: string;

  readonly shape: Shape;

  readonly dimensions: readonly number[];

  readonly specialTiles: Map<Coordinate, Tile>; // not sure if this not being readonly will cause security issues or whatever

  constructor(
    n = 'basic',
    shap: Shape = 'rect',
    dim: readonly number[] = [8, 8],
    t: Map<Coordinate, Tile> = new Map<Coordinate, Tile>(),
    id?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.name = n;
    this.shape = shap;
    this.dimensions = dim;
    this.specialTiles = t;
  }

  changeName(newName: string) {
    return new Board(newName, this.shape, this.dimensions, this.specialTiles, this.id);
  }

  // NOTE: idk if maps copy by value or reference, if things break start here
  addTile(coordinate: Coordinate, tile: Tile): Board {
    if (!this.isLocationValid(coordinate)) {
      return this;
    }
    const newTiles = this.specialTiles;
    newTiles.set(coordinate, tile);
    return new Board(this.name, this.shape, this.dimensions, newTiles, this.id);
  }

  removeTile(coordinate: Coordinate): Board {
    if (!this.isLocationValid(coordinate)) {
      return this;
    }
    // const newTiles = this.specialTiles;
    // newTiles.delete(coordinate);
    const newTilesArr: [Coordinate, Tile][] = Array.from(this.specialTiles.entries());
    for (let i = 0; i < newTilesArr.length; i += 1) {
      const currCoord = newTilesArr[i][0];
      if (currCoord[0] === coordinate[0] && currCoord[1] === coordinate[1]) {
        newTilesArr.splice(i, 1);
        break;
      }
    }
    const newTiles = new Map<Coordinate, Tile>(newTilesArr);
    return new Board(this.name, this.shape, this.dimensions, newTiles, this.id);
  }

  changeDimensions(newDimensions: readonly number[]): Board {
    const tempBoard = new Board(this.name, this.shape, newDimensions);
    const newTiles = this.specialTiles;
    for (const coord of this.specialTiles.keys()) {
      if (!tempBoard.isLocationValid(coord)) {
        newTiles.delete(coord);
      }
    }
    return new Board(this.name, this.shape, newDimensions, newTiles, this.id);
  }

  changeShape(newShape: Shape) {
    return new Board(this.name, newShape, this.dimensions, this.specialTiles, this.id);
  }

  isLocationValid(location: Coordinate): boolean {
    const outOfBounds = location.some(
      (value, index) => value < 0 || value >= this.dimensions[index]
    );
    const wrongDimension = location.length !== this.dimensions.length;
    return !(outOfBounds || wrongDimension);
  }

  toJSON(): BoardJSON {
    return {
      id: this.id,
      name: this.name,
      shape: this.shape,
      dimensions: [...this.dimensions],
      specialTiles: Array.from(this.specialTiles.entries()).map(([c, t]) => [c, t.toJSON()]),
    };
  }

  static fromJSON(data: BoardJSON): Board {
    const name = data.name ? data.name : '';
    const shape = data.shape ? data.shape : 'rect';
    const dim = data.dimensions ? data.dimensions : [];
    const tiles = data.specialTiles
      ? new Map<Coordinate, Tile>(data.specialTiles.map(([c, t]) => [c, Tile.fromJSON(t)]))
      : new Map<Coordinate, Tile>();
    const id = data.id ? data.id : '';

    return new Board(name, shape, dim, tiles, id);
  }
}
