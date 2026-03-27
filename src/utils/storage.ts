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
	instances: Record<string, InstanceJSON>;

	// create / update
	setPiece: (piece: Piece) => void;
	setBoard: (board: Board) => void;
	setGame: (game: Game) => void;
	setInstance: (instance: Instance) => void;

	// retrieve
	getPieces: () => Record<string, Piece>;
	getPiece: (id: string) => Piece | null;
	getBoards: () => Record<string, Board>;
	getBoard: (id: string) => Board | null;
	getGames: () => Record<string, Game>;
	getGame: (id: string) => Game | null;
	getInstances: () => Record<string, Instance>;
	getInstance: (id: string) => Instance | null;

	// delete
	deletePiece: (id: string) => boolean;
	deleteBoard: (id: string) => boolean;
	deleteGame: (id: string) => boolean;
	deleteInstance: (id: string) => boolean;
};

const defaultPieces = {
	[pawn.id]: pawn.toJSON(),
	[knight.id]: knight.toJSON(),
	[bishop.id]: bishop.toJSON(),
	[rook.id]: rook.toJSON(),
	[queen.id]: queen.toJSON(),
	[king.id]: king.toJSON(),
};
const defaultBoards = {
	[basic.id]: basic.toJSON()
};
const defaultGames = {
	[basicGame.id]: basicGame.toJSON()
};

export const useStore = create<StorageState>()(
	persist(
		(set, get) => ({
			pieces: defaultPieces,
			boards: defaultBoards,
			games: defaultGames,
			instances: {},

			setPiece: (p) => {
				set((state) => ({
					pieces: { ...state.pieces, [p.id]: p.toJSON() }
				}))
			},
			setBoard: (b) => {
				set((state) => ({
					boards: { ...state.boards, [b.id]: b.toJSON() }
				}))
			},
			setGame: (g) => {
				set((state) => ({
					games: { ...state.games, [g.id]: g.toJSON() }
				}))
			},
			setInstance: (i) => {
				set((state) => ({
					instances: { ...state.instances, [i.id]: i.toJSON() }
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
			getPiece: (id) => {
				const json = get().pieces[id];
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
			getBoard: (id) => {
				const json = get().boards[id];
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
			getGame: (id) => {
				const json = get().games[id];
				return json ? Game.fromJSON(json) : null;
			},
			getInstances: () => {
				const instances = get().instances;
				const result: Record<string, Instance> = {};
				for (const key in instances) {
					result[key] = Instance.fromJSON(instances[key]);
				}
				return result;
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
			}
		}),
		{
			name: "champions-storage"
		}
	)
);
