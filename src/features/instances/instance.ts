import { Board, checkCoordinateEquality, coordinateToString } from "@/features/boards/board";
import {
  InstancePieceMap,
  type instancePiece,
  type instancePieceId,
  type InstancePieceMapJSON,
} from "@/types/instancePiece";
import type { coordinate } from "@/features/boards/board";
import type { BoardJSON } from "@/features/boards/board";
import type { team, turn } from "@/types/team";
import { calculateMovesRect, type moveCalculationResult } from "@/types/moveCalculation";
import type { direction } from "@/types/move";
import type { Piece } from "../pieces/piece";

export interface info {
  captured?: [coordinate, turn];
  hasMoved: boolean;
  movesMade: number;
}

export interface InstanceJSON {
  id: string;
  board: BoardJSON;
  piecesRecord: InstancePieceMapJSON;
  initialPieces: InstancePieceMapJSON;
  data: [instancePieceId, info][];
  numTeams: number;
}

export class Instance {
  readonly id: string;
  readonly board: Board;
  readonly piecesRecord: InstancePieceMap;
  readonly data: ReadonlyMap<instancePieceId, info>;
  readonly initialPieces: InstancePieceMap;
  readonly numTeams: number;

  constructor(
    b: Board = new Board(),
    n = 2,
    r: InstancePieceMap = new InstancePieceMap(),
    i: InstancePieceMap = new InstancePieceMap(),
    d: ReadonlyMap<instancePieceId, info> = new Map(),
    id?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.board = b;
    this.piecesRecord = r;
    this.data = d;
    this.initialPieces = i;
    this.numTeams = n;
  }
  movePiece(from: coordinate, to: moveCalculationResult) {
    const instancePiece = this.piecesRecord.getInstancePiece(from);
    const toLocation = to.landing;
    const toCapture = to.capturing ?? toLocation;

    if (!instancePiece) {
      return this;
    }
    let newPieces = this.piecesRecord;
    //check to see if the piece on to is a king?
    if (this.piecesRecord.map.get(coordinateToString(toCapture))?.piece.name == "King") {
      //END GAME GOES HERE
      //bandaid fix is to make it just spawn that game again
      //WE NEED INITIAL PIECES????
      return new Instance(this.board, this.numTeams, this.initialPieces, this.initialPieces); //something
    }
    newPieces = newPieces.removeInstancePiece(from);
    newPieces = newPieces.removeInstancePiece(toCapture);
    newPieces = newPieces.moveInstancePiece(toLocation, instancePiece);
    return new Instance(
      this.board,
      this.numTeams,
      newPieces,
      this.initialPieces,
      this.data,
      this.id
    ).recordPieceMove(instancePiece);
  }
  recordPieceMove(piece: instancePiece): Instance {
    const newData = new Map(this.data);
    const pieceData = newData.get(piece.id);
    if (!pieceData) {
      newData.set(piece.id, { hasMoved: true, movesMade: 1 });
    } else {
      newData.set(piece.id, { hasMoved: true, movesMade: pieceData.movesMade + 1 });
    }
    return new Instance(
      this.board,
      this.numTeams,
      this.piecesRecord,
      this.initialPieces,
      newData,
      this.id
    );
  }
  hasPieceMoved(piece: instancePiece): boolean {
    const pieceData = this.data.get(piece.id);
    const t = pieceData?.hasMoved ?? false;
    return t;
  }
  addPiece(coordinate: coordinate, piece: Piece, team: team) {
    let newPieces = this.piecesRecord;
    newPieces = newPieces.setPiece(coordinate, piece, team);
    return new Instance(
      this.board,
      this.numTeams,
      newPieces,
      this.initialPieces,
      this.data,
      this.id
    );
  }
  addInstancePiece(coordinate: coordinate, instancePiece: instancePiece) {
    let newPieces = this.piecesRecord;
    newPieces = newPieces.setInstancePiece(coordinate, instancePiece);
    return new Instance(
      this.board,
      this.numTeams,
      newPieces,
      this.initialPieces,
      this.data,
      this.id
    );
  }
  removeInstancePiece(coordinate: coordinate) {
    let newPieces = this.piecesRecord;
    newPieces = newPieces.removeInstancePiece(coordinate);
    return new Instance(
      this.board,
      this.numTeams,
      newPieces,
      this.initialPieces,
      this.data,
      this.id
    );
  }
  setTeam(coordinate: coordinate, team: team) {
    let newPieces = this.piecesRecord;
    const piece = newPieces.getInstancePiece(coordinate);
    if (!piece) {
      return this;
    }
    piece.team = team;
    newPieces = newPieces.removeInstancePiece(coordinate);
    newPieces = newPieces.setInstancePiece(coordinate, piece);
    return new Instance(
      this.board,
      this.numTeams,
      newPieces,
      this.initialPieces,
      this.data,
      this.id
    );
  }
  getFriendlyPieces(team: team) {
    return this.piecesRecord
      .getKeys()
      .filter(
        (value): value is coordinate => this.piecesRecord.getInstancePiece(value)?.team === team
      );
  }
  getEnemyPieces(team: team) {
    return this.piecesRecord
      .getKeys()
      .filter(
        (value): value is coordinate => this.piecesRecord.getInstancePiece(value)?.team !== team
      );
  }
  getBlockedTiles(piece: Piece): coordinate[] {
    const blockedSpecialTiles: coordinate[] = [];
    for (const [coord, tile] of this.board.specialTiles) {
      let canMove = false;
      for (const move of piece.moves) {
        if (tile.isValidInboundMove(move)) {
          canMove = true;
          break;
        }
      }
      if (!canMove) {
        blockedSpecialTiles.push(coord);
      }
    }
    return blockedSpecialTiles;
  }
  calculateMoves(pieceLocation: coordinate, teamDirection: direction) {
    const piece = this.piecesRecord.getInstancePiece(pieceLocation);
    if (!piece) return [];
    const team = piece.team;
    const friendlyPieces = this.getFriendlyPieces(team).filter(
      (coordinate) => !checkCoordinateEquality(coordinate, pieceLocation)
    );
    const enemyPieces = this.getEnemyPieces(team);
    // add tile if piece can't move into it (and maybe check if it can move out of it? idk)
    const blockedSpecialTiles: coordinate[] = this.getBlockedTiles(piece.piece);
    const blocked = [...friendlyPieces, ...blockedSpecialTiles];
    return calculateMovesRect(
      piece.piece,
      pieceLocation,
      this.board.dimensions as number[],
      blocked as number[][],
      enemyPieces as number[][],
      teamDirection,
      !this.hasPieceMoved(piece)
    );
  }
  toJSON(): InstanceJSON {
    return {
      id: this.id,
      numTeams: this.numTeams,
      board: this.board.toJSON(),
      initialPieces: this.initialPieces.toJSON(),
      piecesRecord: this.piecesRecord.toJSON(),
      data: Array.from(this.data.entries()),
    };
  }
  static fromJSON(data: InstanceJSON): Instance {
    const board = data.board ? Board.fromJSON(data.board) : new Board();
    const numTeams = data.numTeams ? data.numTeams : 2;
    const piecesRecord = data.piecesRecord
      ? InstancePieceMap.fromJSON(data.piecesRecord)
      : new InstancePieceMap();
    const initialPieces = data.initialPieces
      ? InstancePieceMap.fromJSON(data.initialPieces)
      : new InstancePieceMap();
    const instanceData = data.data
      ? new Map<instancePieceId, info>(data.data)
      : new Map<instancePieceId, info>();
    const id = data.id ? data.id : "";
    return new Instance(board, numTeams, piecesRecord, initialPieces, instanceData, id);
  }
}
