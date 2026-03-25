import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Piece } from '@/features/pieces/piece.ts';
import { Board } from '@/features/boards/board.ts';
import { Game } from '@/features/games/game.ts';
import { Instance } from '@/features/instances/instance.ts';

interface StorageState {
  pieces: Record<string, Piece>,
  boards: Record<string, Board>,
  games: Record<string, Game>,
  instance: Instance | null;

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

export const useStore = create<StorageState>()(
  persist(
    (set, get) => ({
      pieces: {},
      boards: {},
      games: {},
      instance: null,

      setPiece: (p) => {
        set((state) => ({
          pieces: {...state.pieces, [p.name]: p}
        }))
      },
      setBoard: (b) => {
        set((state) => ({
          boards: {...state.boards, [b.name]: b}
        }))
      },
      setGame: (g) => {
        set((state) => ({
          games: {...state.games, [g.name]: g}
        }))
      },
      setInstance: (i) => {
        set((_) => ({
          instance: i 
        }))
      },

      getPieces: () => {
        return get().pieces;
      },
      getPiece: (name) => {
        return get().pieces[name] ?? null;
      },
      getBoards: () => {
        return get().boards;
      },
      getBoard: (name) => {
        return get().boards[name] ?? null;
      },
      getGames: () => {
        return get().games;
      },
      getGame: (name) => {
        return get().games[name] ?? null;
      },
      getInstance: () => {
        return get().instance;
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
      name: 'champions-storage'
    }
  )
);