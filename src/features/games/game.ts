import { Board, checkCoordinateEquality } from '@/features/boards/board';
import { InstancePieceMap } from '@/types/instancePiece';
import { calculateMovesRect } from '@/types/moveCalculation';

import { Instance } from '../instances/instance';

import type { BoardJSON, Coordinate } from '@/features/boards/board';
import type { InstancePiece, InstancePieceMapJSON } from '@/types/instancePiece';
import type { Direction } from '@/types/move';
import type { Team } from '@/types/team';

import type { Piece } from '../pieces/piece';
import type { Tile } from '../tiles/tile';

export interface GameJSON {
  id: string;
  name: string;
  board: BoardJSON;
  pieces: InstancePieceMapJSON;
  numTeams: number;
}

export class Game {
  readonly id: string;

  readonly name: string;

  readonly board: Board;

  readonly pieces: InstancePieceMap;

  readonly numTeams: number;

  constructor(
    n: string,
    b: Board = new Board(),
    r: InstancePieceMap = new InstancePieceMap(),
    t = 2,
    id?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.name = n;
    this.board = b;
    this.pieces = r;
    this.numTeams = t;
  }

  movePiece(from: Coordinate, to: Coordinate) {
    const piece = this.pieces.getInstancePiece(from);

    if (!piece) {
      return this;
    }
    let newPieces = this.pieces;
    newPieces = newPieces.removeInstancePiece(from);
    newPieces = newPieces.setPiece(to, piece.piece, piece.team);
    return new Game(this.name, this.board, newPieces, this.numTeams, this.id);
  }

  addPiece(coordinate: Coordinate, piece: Piece, team: Team) {
    let newPieces = this.pieces;
    const blockedSpecialTiles = this.getBlockedTiles(piece);
    if (blockedSpecialTiles.find((c) => c[0] === coordinate[0] && c[1] === coordinate[1])) {
      return this;
    }
    newPieces = newPieces.setPiece(coordinate, piece, team);
    return new Game(this.name, this.board, newPieces, this.numTeams, this.id);
  }

  addInstancePiece(coordinate: Coordinate, instancePiece: InstancePiece) {
    let newPieces = this.pieces;
    newPieces = newPieces.setInstancePiece(coordinate, instancePiece);
    return new Game(this.name, this.board, newPieces, this.numTeams, this.id);
  }

  addTile(coordinate: Coordinate, tile: Tile) {
    const newBoard = this.board;
    newBoard.addTile(coordinate, tile);
    return new Game(this.name, newBoard, this.pieces, this.numTeams, this.id);
  }

  removeInstancePiece(coordinate: Coordinate) {
    let newPieces = this.pieces;
    newPieces = newPieces.removeInstancePiece(coordinate);
    return new Game(this.name, this.board, newPieces, this.numTeams, this.id);
  }

  removeTile(coordinate: Coordinate): Game {
    const newBoard = this.board;
    newBoard.removeTile(coordinate);
    return new Game(this.name, newBoard, this.pieces, this.numTeams, this.id);
  }

  setTeam(coordinate: Coordinate, team: Team) {
    let newPieces = this.pieces;
    const piece = this.pieces.getInstancePiece(coordinate);
    if (!piece) {
      return this;
    }
    piece.team = team;
    newPieces = newPieces.removeInstancePiece(coordinate);
    newPieces = newPieces.setInstancePiece(coordinate, piece);
    return new Game(this.name, this.board, newPieces, this.numTeams, this.id);
  }

  getFriendlyPieces(team: Team) {
    return this.pieces.getFriendlyPieces(team);
  }

  getEnemyPieces(team: Team) {
    return this.pieces.getEnemyPieces(team);
  }

  getBlockedTiles(piece: Piece): Coordinate[] {
    const blockedSpecialTiles: Coordinate[] = [];
    for (const [coord, tile] of this.board.specialTiles) {
      if (piece.moves.find((m) => !tile.isValidInboundMove(m))) {
        blockedSpecialTiles.push(coord);
      }
    }
    return blockedSpecialTiles;
  }

  calculateMoves(pieceLocation: Coordinate, teamDirection: Direction) {
    const piece = this.pieces.getInstancePiece(pieceLocation);
    if (!piece) return [];

    const { team } = piece;
    if (this.board.shape === 'rect') {
      const friendlyPieces = this.getFriendlyPieces(team).filter(
        (coord) => !checkCoordinateEquality(coord, pieceLocation)
      );
      const enemyPieces = this.getEnemyPieces(team);
      // add tile if piece can't move into it (and maybe check if it can move out of it? idk)
      const blockedSpecialTiles: Coordinate[] = this.getBlockedTiles(piece.piece);
      const blocked = [...friendlyPieces, ...blockedSpecialTiles];
      return calculateMovesRect(
        piece.piece,
        pieceLocation,
        this.board.dimensions as number[],
        blocked,
        enemyPieces,
        teamDirection,
        true
      );
    }
    return [];
  }

  verifyPieces(): Game {
    let nextPieces = this.pieces;
    this.pieces.getKeys().forEach((coordinate: Coordinate) => {
      if (!this.board.isLocationValid(coordinate)) {
        nextPieces = nextPieces.removeInstancePiece(coordinate);
      }
    });
    if (nextPieces === this.pieces) return this;
    return new Game(this.name, this.board, nextPieces, this.numTeams, this.id);
  }

  createInstance() {
    return new Instance(this.board, this.numTeams, this.pieces, this.pieces);
  }

  toJSON(): GameJSON {
    return {
      id: this.id,
      numTeams: this.numTeams,
      name: this.name,
      board: this.board.toJSON(),
      pieces: this.pieces.toJSON(),
    };
  }

  static fromJSON(data: GameJSON): Game {
    const name = data.name ? data.name : '';
    const board = data.board ? Board.fromJSON(data.board) : new Board();
    const pieces = data.pieces ? InstancePieceMap.fromJSON(data.pieces) : new InstancePieceMap();
    const numTeams = data.numTeams ? data.numTeams : 2;
    const id = data.id ? data.id : '';
    return new Game(name, board, pieces, numTeams, id);
  }
}
