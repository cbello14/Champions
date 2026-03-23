import { calculateMovesRect } from "./moveCalculation";
import { pawn } from "@/features/pieces/defaultPieces";

describe("Testing Piece Movement Calculation", () => {
	test('Basic pawn movement', () => {
		const pawnLocation = [4, 4]
		const pawnMovesOneUp = [4, 3]
		const possibleMoves = [pawnMovesOneUp]

		expect(calculateMovesRect(pawn, pawnLocation, [8, 8], [], [1, 1], false)).toStrictEqual(possibleMoves)
	})

})

