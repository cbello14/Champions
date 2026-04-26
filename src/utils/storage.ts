import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Piece } from "@/features/pieces/piece.ts";
import { Tile } from "@/features/tiles/tile";
import { Board } from "@/features/boards/board.ts";
import { Game } from "@/features/games/game.ts";
import { Instance } from "@/features/instances/instance.ts";

import { pawn, knight, bishop, rook, queen, king } from "@/features/pieces/defaultPieces";
import { fullBlocker } from "@/features/tiles/defaultTiles";
import { basic } from "@/features/boards/defaultBoards";
import { basicGame } from "@/features/games/defaultGames";

import type { PieceJSON } from "@/features/pieces/piece.ts";
import type { TileJSON } from "@/features/tiles/tile.ts";
import type { BoardJSON } from "@/features/boards/board.ts";
import type { GameJSON } from "@/features/games/game.ts";
import type { InstanceJSON } from "@/features/instances/instance.ts";

interface StorageState {
  pieces: Record<string, PieceJSON>;
  tiles: Record<string, TileJSON>;
  boards: Record<string, BoardJSON>;
  games: Record<string, GameJSON>;
  instances: Record<string, InstanceJSON>;

  // create / update
  setPiece: (piece: Piece) => void;
  setTile: (tile: Tile) => void;
  setBoard: (board: Board) => void;
  setGame: (game: Game) => void;
  setInstance: (instance: Instance) => void;

  // retrieve
  getPieces: () => Piece[];
  getPiece: (id: string) => Piece | null;
  getTiles: () => Tile[];
  getTile: (id: string) => Tile | null;
  getBoards: () => Board[];
  getBoard: (id: string) => Board | null;
  getGames: () => Game[];
  getGame: (id: string) => Game | null;
  getInstances: () => Instance[];
  getInstance: (id: string) => Instance | null;

  // delete
  deletePiece: (id: string) => boolean;
  deleteTile: (id: string) => boolean;
  deleteBoard: (id: string) => boolean;
  deleteGame: (id: string) => boolean;
  deleteInstance: (id: string) => boolean;
}

const defaultPieces = {
  [pawn.id]: pawn.toJSON(),
  [knight.id]: knight.toJSON(),
  [bishop.id]: bishop.toJSON(),
  [rook.id]: rook.toJSON(),
  [queen.id]: queen.toJSON(),
  [king.id]: king.toJSON(),
};
const defaultTiles = {
  [fullBlocker.id]: fullBlocker.toJSON(),
};
const defaultBoards = {
  [basic.id]: basic.toJSON(),
};
const defaultGames = {
  [basicGame.id]: basicGame.toJSON(),
};

export const useStore = create<StorageState>()(
  persist(
    (set, get) => ({
      pieces: defaultPieces,
      tiles: defaultTiles,
      boards: defaultBoards,
      games: defaultGames,
      instances: {},

      setPiece: (p) => {
        set((state) => ({
          pieces: { [p.id]: p.toJSON(), ...state.pieces },
        }));
      },
      setTile: (t) => {
        set((state) => ({
          tiles: { ...state.tiles, [t.id]: t.toJSON() },
        }));
      },
      setBoard: (b) => {
        set((state) => ({
          boards: { ...state.boards, [b.id]: b.toJSON() },
        }));
      },
      setGame: (g) => {
        set((state) => ({
          games: { ...state.games, [g.id]: g.toJSON() },
        }));
      },
      setInstance: (i) => {
        set((state) => ({
          instances: { ...state.instances, [i.id]: i.toJSON() },
        }));
      },

      getPieces: () => {
        const pieces = get().pieces;
        return Object.values(pieces).map((pieceJSON) => Piece.fromJSON(pieceJSON));
      },
      getPiece: (id) => {
        const json = get().pieces[id];
        return json ? Piece.fromJSON(json) : null;
      },
      getTiles: () => {
        const tiles = get().tiles;
        return Object.values(tiles).map((tileJSON) => Tile.fromJSON(tileJSON));
      },
      getTile: (id) => {
        const json = get().tiles[id];
        return json ? Tile.fromJSON(json) : null;
      },
      getBoards: () => {
        const boards = get().boards;
        return Object.values(boards).map((boardJSON) => Board.fromJSON(boardJSON));
      },
      getBoard: (id) => {
        const json = get().boards[id];
        return json ? Board.fromJSON(json) : null;
      },
      getGames: () => {
        const games = get().games;
        return Object.values(games).map((gameJSON) => Game.fromJSON(gameJSON));
      },
      getGame: (id) => {
        const json = get().games[id];
        return json ? Game.fromJSON(json) : null;
      },
      getInstances: () => {
        const instances = get().instances;
        return Object.values(instances).map((instanceJSON) => Instance.fromJSON(instanceJSON));
      },
      getInstance: (id) => {
        const json = get().instances[id];
        return json ? Instance.fromJSON(json) : null;
      },

      deletePiece: (id) => {
        if (!get().pieces[id]) return false;
        set((state) => {
          const newPieces = { ...state.pieces };
          delete newPieces[id];
          return { pieces: newPieces };
        });
        return true;
      },
      deleteTile: (id) => {
        if (!get().tiles[id]) return false;
        set((state) => {
          const newTiles = { ...state.tiles };
          delete newTiles[id];
          return { tiles: newTiles };
        });
        return true;
      },
      deleteBoard: (id) => {
        if (!get().boards[id]) return false;
        set((state) => {
          const newBoards = { ...state.boards };
          delete newBoards[id];
          return { boards: newBoards };
        });
        return true;
      },
      deleteGame: (id) => {
        if (!get().games[id]) return false;
        set((state) => {
          const newGames = { ...state.games };
          delete newGames[id];
          return { games: newGames };
        });
        return true;
      },
      deleteInstance: (id) => {
        if (!get().instances[id]) return false;
        set((state) => {
          const newInstances = { ...state.instances };
          delete newInstances[id];
          return { instances: newInstances };
        });
        return true;
      },
    }),
    {
      name: "champions-storage",
    }
  )
);
