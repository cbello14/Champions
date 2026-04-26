import { Board, type coordinate } from "./board";
import { Tile } from "@/features/tiles/tile";

export const basic: Board = new Board("Default", "rect", [8, 8], new Map<coordinate, Tile>());

export const wallTest: Board = new Board("Wall Test", "rect", [3, 1], new Map<coordinate, Tile>());
