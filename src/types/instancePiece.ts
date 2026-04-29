import { coordinateStringToCoordinate, coordinateToString } from '@/features/boards/board';
import { Piece } from '@/features/pieces/piece';

import type { Coordinate, CoordinateString } from '@/features/boards/board';
import type { PieceJSON } from '@/features/pieces/piece';

import type { Team } from './team';

export type InstancePieceId = number;

export interface InstancePiece {
  id: InstancePieceId;
  piece: Piece;
  team: Team;
}

export interface InstancePieceJSON {
  id: InstancePieceId;
  piece: PieceJSON;
  team: Team;
}

export type InstancePieceMapJSON = [CoordinateString, InstancePieceJSON][];

export class InstancePieceMap {
  readonly map: ReadonlyMap<CoordinateString, InstancePiece>;

  readonly maxId: InstancePieceId;

  constructor(
    map: ReadonlyMap<CoordinateString, InstancePiece> = new Map(),
    currentMaxId?: number
  ) {
    if (currentMaxId !== undefined) {
      // if we are creating our map from a previous instance
      this.map = map;
      this.maxId = currentMaxId;
      return;
    }

    const newMap = new Map<CoordinateString, InstancePiece>();
    let calcMaxId = 0;

    for (const [coordStr, piece] of map.entries()) {
      if (piece.id <= calcMaxId) {
        calcMaxId += 1;
        newMap.set(coordStr, { ...piece, id: calcMaxId });
      } else {
        calcMaxId = piece.id;
        newMap.set(coordStr, piece);
      }
    }
    this.map = newMap;
    this.maxId = calcMaxId;
  }

  getInstancePiece(coordinate: Coordinate) {
    const coordinateString = coordinateToString(coordinate);
    return this.map.get(coordinateString);
  }

  setPiece(coordinate: Coordinate, piece: Piece, team: Team): InstancePieceMap {
    const coordinateString = coordinateToString(coordinate);
    const newMap = new Map(this.map);
    const newId = this.maxId + 1;

    const instance: InstancePiece = { id: newId, piece, team };

    newMap.set(coordinateString, instance);
    return new InstancePieceMap(newMap, newId);
  }

  setInstancePiece(coordinate: Coordinate, instancePiece: InstancePiece): InstancePieceMap {
    const coordinateString = coordinateToString(coordinate);
    const newMap = new Map(this.map);

    let newMaxId = this.maxId;
    let newPiece = instancePiece;

    if (instancePiece.id <= this.maxId) {
      newMaxId += 1;
      newPiece = { ...instancePiece, id: newMaxId };
    } else {
      newMaxId = instancePiece.id;
    }

    newMap.set(coordinateString, newPiece);
    return new InstancePieceMap(newMap, newMaxId);
  }

  moveInstancePiece(coordinate: Coordinate, instancePiece: InstancePiece): InstancePieceMap {
    const coordinateString = coordinateToString(coordinate);
    const newMap = new Map(this.map);

    newMap.set(coordinateString, instancePiece);
    return new InstancePieceMap(newMap, this.maxId);
  }

  removeInstancePiece(coordinate: Coordinate): InstancePieceMap {
    const coordinateString = coordinateToString(coordinate);
    const newMap = new Map(this.map);
    newMap.delete(coordinateString);
    return new InstancePieceMap(newMap, this.maxId);
  }

  getKeys(): Coordinate[] {
    return [...this.map.keys()]
      .map((coordString) => coordinateStringToCoordinate(coordString))
      .filter((coord): coord is Coordinate => coord !== null);
  }

  getFriendlyPieces(team: Team) {
    return this.getKeys().filter(
      (value): value is Coordinate => this.getInstancePiece(value)?.team === team
    );
  }

  getEnemyPieces(team: Team) {
    return this.getKeys().filter(
      (value): value is Coordinate => this.getInstancePiece(value)?.team !== team
    );
  }

  toJSON(): InstancePieceMapJSON {
    return Array.from(this.map.entries()).map(([coord, inst]) => [
      coord,
      { id: inst.id, piece: inst.piece.toJSON(), team: inst.team },
    ]);
  }

  static fromJSON(data: InstancePieceMapJSON): InstancePieceMap {
    const map = new Map<CoordinateString, InstancePiece>(
      data.map(([coord, inst]: [string, InstancePieceJSON]) => [
        coord,
        { id: inst.id, piece: Piece.fromJSON(inst.piece), team: inst.team },
      ])
    );
    return new InstancePieceMap(map);
  }

  // eslint-disable-next-line class-methods-use-this
  clear(): InstancePieceMap {
    return new InstancePieceMap();
  }
}
