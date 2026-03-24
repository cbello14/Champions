import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Piece } from '@/features/pieces/piece.ts';
import { Board } from '@/features/boards/board.ts';
import { Game } from '@/features/games/game.ts';
import { Instance } from '@/features/instances/instance.ts';

interface StorageState {
  pieces: Piece[],
  boards: Board[],
  games: Game[],
  instance: Instance | null;

  savePiece: (piece: Piece) => void;
  saveBoard: (board: Board) => void;
  saveGame: (game: Game) => void;
  saveInstance: (instance: Instance) => void;
};

export const useStore = create<StorageState>()(
  persist(
    (set) => ({
      pieces: [],
      boards: [],
      games: [],
      instance: null,

      savePiece: (p) => {
        set((state) => ({
          pieces: [...state.pieces, p]
        }))
      },
      saveBoard: (b) => {
        set((state) => ({
          boards: [...state.boards, b]
        }))
      },
      saveGame: (g) => {
        set((state) => ({
          games: [...state.games, g]
        }))
      },
      saveInstance: (i) => {
        set((_) => ({
          instance: i 
        }))
      }
    }),
    {
      name: 'champions-storage'
    }
  )
);