import { Game } from "./game";
import { basic } from "../boards/defaultBoards";
import { pawn, rook, knight, bishop, queen, king } from "../pieces/defaultPieces";
import type { coordinateString } from "@/types/board";
import type { instancePiece } from "@/types/instance";
import { InstancePieceMap } from "@/types/instancePieceMap";

const map =
	new Map<coordinateString, instancePiece>([
		["[0,0]", { id: 0, piece: rook, team: 0 }],
		["[1,0]", { id: 1, piece: knight, team: 0 }],
		["[2,0]", { id: 2, piece: bishop, team: 0 }],
		["[3,0]", { id: 3, piece: queen, team: 0 }],
		["[4,0]", { id: 4, piece: king, team: 0 }],
		["[5,0]", { id: 5, piece: bishop, team: 0 }],
		["[6,0]", { id: 6, piece: knight, team: 0 }],
		["[7,0]", { id: 7, piece: rook, team: 0 }],

		["[0,1]", { id: 8, piece: pawn, team: 0 }],
		["[1,1]", { id: 9, piece: pawn, team: 0 }],
		["[2,1]", { id: 10, piece: pawn, team: 0 }],
		["[3,1]", { id: 11, piece: pawn, team: 0 }],
		["[4,1]", { id: 12, piece: pawn, team: 0 }],
		["[5,1]", { id: 13, piece: pawn, team: 0 }],
		["[6,1]", { id: 14, piece: pawn, team: 0 }],
		["[7,1]", { id: 15, piece: pawn, team: 0 }],

		["[0,6]", { id: 16, piece: pawn, team: 1 }],
		["[1,6]", { id: 17, piece: pawn, team: 1 }],
		["[2,6]", { id: 18, piece: pawn, team: 1 }],
		["[3,6]", { id: 19, piece: pawn, team: 1 }],
		["[4,6]", { id: 20, piece: pawn, team: 1 }],
		["[5,6]", { id: 21, piece: pawn, team: 1 }],
		["[6,6]", { id: 22, piece: pawn, team: 1 }],
		["[7,6]", { id: 23, piece: pawn, team: 1 }],

		["[0,7]", { id: 24, piece: rook, team: 1 }],
		["[1,7]", { id: 25, piece: knight, team: 1 }],
		["[2,7]", { id: 26, piece: bishop, team: 1 }],
		["[3,7]", { id: 27, piece: queen, team: 1 }],
		["[4,7]", { id: 28, piece: king, team: 1 }],
		["[5,7]", { id: 29, piece: bishop, team: 1 }],
		["[6,7]", { id: 30, piece: knight, team: 1 }],
		["[7,7]", { id: 31, piece: rook, team: 1 }]
	])

const instancePieceMap = new InstancePieceMap(map)

export const basicGame: Game = new Game(
	basic,
	instancePieceMap
);
