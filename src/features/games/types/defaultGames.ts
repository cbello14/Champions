import type { game } from "./game";
import { basic } from "@/features/boards/types/defaultBoards";
import { pawn, king, queen, rook, knight, bishop } from "@/features/pieces/types/defaultPieces";

export const basicGame: game = {
	board: basic,
	pieces: new Map(
		[
			["[0,0]", [rook, 0]], ["[1,0]", [knight, 0]], ["[2,0]", [bishop, 0]], ["[3,0]", [queen, 0]],
			["[4,0]", [king, 0]], ["[5,0]", [bishop, 0]], ["[6,0]", [knight, 0]], ["[7,0]", [rook, 0]],
			["[0,1]", [pawn, 0]], ["[1,1]", [pawn, 0]], ["[2,1]", [pawn, 0]], ["[3,1]", [pawn, 0]],
			["[4,1]", [pawn, 0]], ["[5,1]", [pawn, 0]], ["[6,1]", [pawn, 0]], ["[7,1]", [pawn, 0]],

			["[0,6]", [pawn, 1]], ["[1,6]", [pawn, 1]], ["[2,6]", [pawn, 1]], ["[3,6]", [pawn, 1]],
			["[4,6]", [pawn, 1]], ["[5,6]", [pawn, 1]], ["[6,6]", [pawn, 1]], ["[7,6]", [pawn, 1]],
			["[0,7]", [rook, 1]], ["[1,7]", [knight, 1]], ["[2,7]", [bishop, 1]], ["[3,7]", [queen, 1]],
			["[4,7]", [king, 1]], ["[5,7]", [bishop, 1]], ["[6,7]", [knight, 1]], ["[7,7]", [rook, 1]]
		]
	)
}
