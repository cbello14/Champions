import { Instance } from "@/features/instances/instance";
import { Board } from "@/features/boards/board";
import { Tile } from "@/features/tiles/tile";
import { Piece } from "@/features/pieces/piece";
import { InstancePieceMap } from "@/types/instancePiece";
import { moveDirection, moveMovementType } from "@/types/move";
import type { move } from "@/types/move";

const slidePiece = new Piece(
	"pawn",
	{ src: "", verified: false },
	[
		{
			attributes: { type: moveMovementType.slide, reflection: "none", initialMove: "optional", capturing: "optional" },
			movements: [{ direction: moveDirection.up, distance: 1 }],
		},
	],
	["direct"]
);

const board = new Board("b", "rect", [8, 8]);

function makeInstance(pieces: InstancePieceMap = new InstancePieceMap()): Instance {
	return new Instance(board, 2, pieces, pieces);
}

describe("Instance", () => {
	describe("movePiece", () => {
		test("moves a piece from one coordinate to another", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			const result = instance.movePiece([3, 3], { landing: [3, 2], capturing: null });
			expect(result.piecesRecord.getInstancePiece([3, 2])).toBeDefined();
			expect(result.piecesRecord.getInstancePiece([3, 3])).toBeUndefined();
		});
		test("returns the same instance when no piece exists at from", () => {
			const instance = makeInstance();
			const result = instance.movePiece([0, 0], { landing: [1, 1], capturing: null });
			expect(result).toBe(instance);
		});
		test("resets to initial pieces when a King is captured", () => {
			const king = new Piece("King", { src: "", verified: false }, [], []);
			const initialPieces = new InstancePieceMap().setPiece([0, 0], slidePiece, 1);
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([3, 2], king, 2);
			const instance = new Instance(board, 2, pieces, initialPieces);
			const result = instance.movePiece([3, 3], { landing: [3, 2], capturing: [3, 2] });
			expect(result.piecesRecord.getInstancePiece([0, 0])).toBeDefined();
		});
	});

	describe("recordPieceMove", () => {
		test("records the first move for a piece", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ip = instance.piecesRecord.getInstancePiece([3, 3])!;
			const result = instance.recordPieceMove(ip);
			expect(result.data.get(ip.id)?.hasMoved).toBe(true);
			expect(result.data.get(ip.id)?.movesMade).toBe(1);
		});
		test("increments movesMade on subsequent calls", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ip = instance.piecesRecord.getInstancePiece([3, 3])!;
			const once = instance.recordPieceMove(ip);
			const twice = once.recordPieceMove(ip);
			expect(twice.data.get(ip.id)?.movesMade).toBe(2);
		});
	});

	describe("hasPieceMoved", () => {
		test("returns false for a piece with no recorded moves", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ip = instance.piecesRecord.getInstancePiece([3, 3])!;
			expect(instance.hasPieceMoved(ip)).toBe(false);
		});
		test("returns true after a move is recorded", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ip = instance.piecesRecord.getInstancePiece([3, 3])!;
			const moved = instance.recordPieceMove(ip);
			expect(moved.hasPieceMoved(ip)).toBe(true);
		});
	});

	describe("addPiece", () => {
		test("places a piece at the given coordinate", () => {
			const instance = makeInstance();
			const result = instance.addPiece([4, 4], slidePiece, 1);
			expect(result.piecesRecord.getInstancePiece([4, 4])).toBeDefined();
		});
	});

	describe("addInstancePiece", () => {
		test("places an instancePiece at the given coordinate", () => {
			const instance = makeInstance();
			const ip = { id: 99, piece: slidePiece, team: 1 };
			const result = instance.addInstancePiece([4, 4], ip);
			expect(result.piecesRecord.getInstancePiece([4, 4])).toBeDefined();
		});
	});

	describe("removeInstancePiece", () => {
		test("removes the piece at the given coordinate", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			const result = instance.removeInstancePiece([3, 3]);
			expect(result.piecesRecord.getInstancePiece([3, 3])).toBeUndefined();
		});
	});

	describe("setTeam", () => {
		test("changes the team of the piece at the coordinate", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			const result = instance.setTeam([3, 3], 2);
			expect(result.piecesRecord.getInstancePiece([3, 3])?.team).toBe(2);
		});
		test("returns the same instance when no piece exists", () => {
			const instance = makeInstance();
			const result = instance.setTeam([0, 0], 2);
			expect(result).toBe(instance);
		});
	});

	describe("getFriendlyPieces", () => {
		test("returns only coordinates belonging to the given team", () => {
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([4, 4], slidePiece, 2);
			const instance = makeInstance(pieces);
			expect(instance.getFriendlyPieces(1)).toHaveLength(1);
		});
		test("returns empty when the team has no pieces", () => {
			const instance = makeInstance();
			expect(instance.getFriendlyPieces(1)).toHaveLength(0);
		});
	});

	describe("getEnemyPieces", () => {
		test("returns coordinates not belonging to the given team", () => {
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([4, 4], slidePiece, 2);
			const instance = makeInstance(pieces);
			expect(instance.getEnemyPieces(1)).toHaveLength(1);
		});
		test("returns all pieces when the team has no own pieces", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 2);
			const instance = makeInstance(pieces);
			expect(instance.getEnemyPieces(1)).toHaveLength(1);
		});
	});

	describe("getBlockedTiles", () => {
		const tileMove: move = {
			attributes: { type: moveMovementType.slide, reflection: "none", initialMove: "optional", capturing: "optional" },
			movements: [{ direction: moveDirection.up, distance: 1 }],
		};

		test("returns tiles that none of the piece's moves can enter", () => {
			const tile = new Tile("restricted", [tileMove], []);
			const coord = [2, 2];
			const specialTiles = new Map([[coord, tile]]);
			const boardWithTile = new Board("b", "rect", [8, 8], specialTiles);
			const jumpPiece = new Piece(
				"jumper",
				{ src: "", verified: false },
				[
					{
						attributes: {
							type: moveMovementType.jump, reflection: "none", initialMove: "optional",
							capturing: "optional"
						},
						movements: [{ direction: moveDirection.down, distance: 1 }],
					},
				],
				["direct"]
			);
			const instance = new Instance(
				boardWithTile,
				2,
				new InstancePieceMap(),
				new InstancePieceMap()
			);
			expect(instance.getBlockedTiles(jumpPiece)).toHaveLength(1);
		});
		test("returns empty when the piece's moves match the tile's inbound moves", () => {
			const tile = new Tile("open", [tileMove], []);
			const coord = [2, 2];
			const specialTiles = new Map([[coord, tile]]);
			const boardWithTile = new Board("b", "rect", [8, 8], specialTiles);
			const matchingPiece = new Piece("mover", { src: "", verified: false }, [tileMove], ["direct"]);
			const instance = new Instance(
				boardWithTile,
				2,
				new InstancePieceMap(),
				new InstancePieceMap()
			);
			expect(instance.getBlockedTiles(matchingPiece)).toHaveLength(0);
		});
	});

	describe("calculateMoves", () => {
		test("returns empty array when no piece exists at the location", () => {
			const instance = makeInstance();
			expect(instance.calculateMoves([3, 3], moveDirection.up)).toEqual([]);
		});
		test("returns valid moves for a piece on a rect board", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = makeInstance(pieces);
			const moves = instance.calculateMoves([3, 3], moveDirection.up);
			expect(moves).toHaveLength(1);
			expect(moves[0].landing).toEqual([3, 2]);
		});
		test("excludes friendly pieces from landing squares", () => {
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([3, 2], slidePiece, 1);
			const instance = makeInstance(pieces);
			const moves = instance.calculateMoves([3, 3], moveDirection.up);
			expect(moves).toHaveLength(0);
		});
	});

	describe("toJSON", () => {
		test("serializes the instance fields correctly", () => {
			const instance = makeInstance();
			const json = instance.toJSON();
			expect(json.id).toBe(instance.id);
			expect(json.numTeams).toBe(2);
			expect(json.board).toBeDefined();
			expect(json.piecesRecord).toBeDefined();
			expect(json.initialPieces).toBeDefined();
		});
	});

	describe("fromJSON", () => {
		test("reconstructs an instance from its JSON", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const instance = new Instance(board, 2, pieces, pieces);
			const restored = Instance.fromJSON(instance.toJSON());
			expect(restored.id).toBe(instance.id);
			expect(restored.numTeams).toBe(instance.numTeams);
			expect(restored.piecesRecord.getInstancePiece([3, 3])).toBeDefined();
		});
	});
});
