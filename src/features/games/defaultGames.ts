import { Game } from "./game";
import { basic } from "../boards/defaultBoards";
import { pawn, rook, knight, bishop, queen, king } from "../pieces/defaultPieces";
import type { coordinateString } from "@/types/board";
import type { instancePiece } from "@/types/instance";

export const basicGame: Game = new Game(
	basic,
	new Map<coordinateString, instancePiece>([
		["[0,0]", { piece: rook, team: 0 }], ["[1,0]", { piece: knight, team: 0 }], ["[2,0]", { piece: bishop, team: 0 }], ["[3,0]", { piece: queen, team: 0 }],
		["[4,0]", { piece: king, team: 0 }], ["[5,0]", { piece: bishop, team: 0 }], ["[6,0]", { piece: knight, team: 0 }], ["[7,0]", { piece: rook, team: 0 }],
		["[0,1]", { piece: pawn, team: 0 }], ["[1,1]", { piece: pawn, team: 0 }], ["[2,1]", { piece: pawn, team: 0 }], ["[3,1]", { piece: pawn, team: 0 }],
		["[4,1]", { piece: pawn, team: 0 }], ["[5,1]", { piece: pawn, team: 0 }], ["[6,1]", { piece: pawn, team: 0 }], ["[7,1]", { piece: pawn, team: 0 }],

		["[0,6]", { piece: pawn, team: 1 }], ["[1,6]", { piece: pawn, team: 1 }], ["[2,6]", { piece: pawn, team: 1 }], ["[3,6]", { piece: pawn, team: 1 }],
		["[4,6]", { piece: pawn, team: 1 }], ["[5,6]", { piece: pawn, team: 1 }], ["[6,6]", { piece: pawn, team: 1 }], ["[7,6]", { piece: pawn, team: 1 }],
		["[0,7]", { piece: rook, team: 1 }], ["[1,7]", { piece: knight, team: 1 }], ["[2,7]", { piece: bishop, team: 1 }], ["[3,7]", { piece: queen, team: 1 }],
		["[4,7]", { piece: king, team: 1 }], ["[5,7]", { piece: bishop, team: 1 }], ["[6,7]", { piece: knight, team: 1 }], ["[7,7]", { piece: rook, team: 1 }]
	])
);
