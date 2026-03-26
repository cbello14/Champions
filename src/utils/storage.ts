import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Piece } from "@/features/pieces/piece.ts";
import { Board } from "@/features/boards/board.ts";
import { Game } from "@/features/games/game.ts";
import { Instance } from "@/features/instances/instance.ts";

import { pawn, knight, bishop, rook, queen, king } from "@/features/pieces/defaultPieces";
import { basic } from "@/features/boards/defaultBoards";
import { basicGame } from "@/features/games/defaultGames";

import type { PieceJSON } from "@/types/piece";
import type { BoardJSON } from "@/types/board";
import type { GameJSON } from "@/types/game";
import type { InstanceJSON } from "@/types/instance";


interface StorageState {
  pieces: Record<string, PieceJSON>,
  boards: Record<string, BoardJSON>,
  games: Record<string, GameJSON>,
  instance: InstanceJSON | null;

  // create / update
  setPiece: (piece: Piece) => void;
  setBoard: (board: Board) => void;
  setGame: (game: Game) => void;
  setInstance: (instance: Instance) => void;

  // retrieve
  getPieces: () => Record<string, Piece>;
  getPiece: (name: string) => Piece | null;
  getBoards: () => Record<string, Board>;
  getBoard: (name: string) => Board | null;
  getGames: () => Record<string, Game>;
  getGame: (name: string) => Game | null;
  getInstance: () => Instance | null;

  // delete
  deletePiece: (name: string) => boolean;
  deleteBoard: (name: string) => boolean;
  deleteGame: (name: string) => boolean;
  deleteInstance: () => boolean;
};

const defaultPieces = {
  [pawn.name]: pawn.toJSON(),
  [knight.name]: knight.toJSON(),
  [bishop.name]: bishop.toJSON(),
  [rook.name]: rook.toJSON(),
  [queen.name]: queen.toJSON(),
  [king.name]: king.toJSON(),
};
const defaultBoards = {
  [basic.name]: basic.toJSON()
};
const defaultGames = {
  [basicGame.name]: basicGame.toJSON()
};

export const useStore = create<StorageState>()(
  persist(
    (set, get) => ({
      pieces: defaultPieces,
      boards: defaultBoards,
      games: defaultGames,
      instance: null,

      setPiece: (p) => {
        set((state) => ({
          pieces: {...state.pieces, [p.name]: p.toJSON()}
        }))
      },
      setBoard: (b) => {
        set((state) => ({
          boards: {...state.boards, [b.name]: b.toJSON()}
        }))
      },
      setGame: (g) => {
        set((state) => ({
          games: {...state.games, [g.name]: g.toJSON()}
        }))
      },
      setInstance: (i) => {
        set((_) => ({
          instance: i.toJSON()
        }))
      },

      getPieces: () => {
        const pieces = get().pieces;
        const result: Record<string, Piece> = {};
        for (const key in pieces) {
          result[key] = Piece.fromJSON(pieces[key]);
        }
        return result;
      },
      getPiece: (name) => {
        const json = get().pieces[name];
        return json ? Piece.fromJSON(json) : null;
      },
      getBoards: () => {
        const boards = get().boards;
        const result: Record<string, Board> = {};
        for (const key in boards) {
          result[key] = Board.fromJSON(boards[key]);
        }
        return result;
      },
      getBoard: (name) => {
        const json = get().boards[name];
        return json ? Board.fromJSON(json) : null;
      },
      getGames: () => {
        const games = get().games;
        const result: Record<string, Game> = {};
        for (const key in games) {
          result[key] = Game.fromJSON(games[key]);
        }
        return result;
      },
      getGame: (name) => {
        const json = get().games[name];
        return json ? Game.fromJSON(json) : null;
      },
      getInstance: () => {
        const json = get().instance;
        return json ? Instance.fromJSON(json) : null;
      },

      deletePiece: (name) => {
        if (!get().pieces[name]) return false;
        set((state) => {
          const newPieces = {...state.pieces};
          delete newPieces[name];
          return {pieces: newPieces};
        });
        return true;
      },
      deleteBoard: (name) => {
        if (!get().boards[name]) return false;
        set((state) => {
          const newBoards = {...state.boards};
          delete newBoards[name];
          return {boards: newBoards};
        });
        return true;
      },
      deleteGame: (name) => {
        if (!get().games[name]) return false;
        set((state) => {
          const newGames = {...state.games};
          delete newGames[name];
          return {games: newGames};
        });
        return true;
      },
      deleteInstance: () => {
        if (!get().instance) return false;
        set((_) => ({
          instance: null
        }));
        return true;
      }
    }),
    {
      name: "champions-storage"
    }
  )
);
