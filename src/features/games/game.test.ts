import { Game } from "@/features/games/game";
import { Board } from "@/features/boards/board";
import { Tile } from "@/features/tiles/tile";
import { Piece } from "@/features/pieces/piece";
import { InstancePieceMap } from "@/types/instancePiece";
import { moveDirection, moveMovementType } from "@/types/move";
import type { move } from "@/types/move";
import { Instance } from "@/features/instances/instance";

const slidePiece = new Piece(
	"pawn",
	{ src: "", verified: false },
	[
		{
			attributes: {
				type: moveMovementType.slide,
				reflection: "none",
				initialMove: "optional",
				capturing: "optional"
			},
			movements: [{ direction: moveDirection.up, distance: 1 }],
		},
	],
	["direct"]
);

function makeGame(pieces: InstancePieceMap = new InstancePieceMap()): Game {
	return new Game("g", new Board("b", "rect", [8, 8]), pieces, 2);
}

describe("Game", () => {
	describe("movePiece", () => {
		test("moves a piece from one coordinate to another", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const result = game.movePiece([3, 3], [3, 2]);
			expect(result.pieces.getInstancePiece([3, 2])).toBeDefined();
			expect(result.pieces.getInstancePiece([3, 3])).toBeUndefined();
		});
		test("returns the same game when no piece exists at from", () => {
			const game = makeGame();
			const result = game.movePiece([0, 0], [1, 1]);
			expect(result).toBe(game);
		});
	});

	describe("addPiece", () => {
		test("places a piece at the given coordinate", () => {
			const game = makeGame();
			const result = game.addPiece([4, 4], slidePiece, 1);
			expect(result.pieces.getInstancePiece([4, 4])).toBeDefined();
		});
		test("does not place a piece on a blocked special tile", () => {
			const tileMove: move = {
				attributes: {
					type: moveMovementType.slide,
					reflection: "none",
					initialMove: "optional",
					capturing: "optional"
				},
				movements: [{ direction: moveDirection.up, distance: 1 }],
			};
			const tile = new Tile("restricted", [tileMove], []);
			const coord = [2, 2];
			const specialTiles = new Map([[coord, tile]]);
			const board = new Board("b", "rect", [8, 8], specialTiles);
			const jumpPiece = new Piece(
				"jumper",
				{ src: "", verified: false },
				[
					{
						attributes: {
							type: moveMovementType.jump,
							reflection: "none",
							initialMove: "optional",
							capturing: "optional"
						},
						movements: [{ direction: moveDirection.down, distance: 1 }],
					},
				],
				["direct"]
			);
			const game = new Game("g", board, new InstancePieceMap(), 2);
			const result = game.addPiece(coord, jumpPiece, 1);
			expect(result.pieces.getInstancePiece(coord)).toBeUndefined();
		});
	});

	describe("addInstancePiece", () => {
		test("places an instancePiece at the given coordinate", () => {
			const game = makeGame();
			const ip = { id: 1, piece: slidePiece, team: 1 };
			const result = game.addInstancePiece([4, 4], ip);
			expect(result.pieces.getInstancePiece([4, 4])).toBeDefined();
		});
	});

	describe("addTile", () => {
		test("returns a new Game instance", () => {
			const game = makeGame();
			const coord = [2, 2];
			const tile = new Tile("t", [], []);
			const result = game.addTile(coord, tile);
			expect(result).toBeInstanceOf(Game);
		});
	});

	describe("removeInstancePiece", () => {
		test("removes the piece at the given coordinate", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const result = game.removeInstancePiece([3, 3]);
			expect(result.pieces.getInstancePiece([3, 3])).toBeUndefined();
		});
	});

	describe("removeTile", () => {
		test("returns a new Game instance", () => {
			const game = makeGame();
			const result = game.removeTile([0, 0]);
			expect(result).toBeInstanceOf(Game);
		});
	});

	describe("setTeam", () => {
		test("changes the team of the piece at the coordinate", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const result = game.setTeam([3, 3], 2);
			expect(result.pieces.getInstancePiece([3, 3])?.team).toBe(2);
		});
		test("returns the same game when no piece exists", () => {
			const game = makeGame();
			const result = game.setTeam([0, 0], 2);
			expect(result).toBe(game);
		});
	});

	describe("getFriendlyPieces", () => {
		test("returns coordinates belonging to the given team", () => {
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([4, 4], slidePiece, 2);
			const game = makeGame(pieces);
			expect(game.getFriendlyPieces(1)).toHaveLength(1);
		});
		test("returns empty when the team has no pieces", () => {
			expect(makeGame().getFriendlyPieces(1)).toHaveLength(0);
		});
	});

	describe("getEnemyPieces", () => {
		test("returns coordinates not belonging to the given team", () => {
			const pieces = new InstancePieceMap()
				.setPiece([3, 3], slidePiece, 1)
				.setPiece([4, 4], slidePiece, 2);
			const game = makeGame(pieces);
			expect(game.getEnemyPieces(1)).toHaveLength(1);
		});
		test("returns all pieces when the team has no own pieces", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 2);
			expect(makeGame(pieces).getEnemyPieces(1)).toHaveLength(1);
		});
	});

	describe("getBlockedTiles", () => {
		const tileMove: move = {
			attributes: {
				type: moveMovementType.slide,
				reflection: "none",
				initialMove: "optional",
				capturing: "optional"
			},
			movements: [{ direction: moveDirection.up, distance: 1 }],
		};

		test("returns tiles where any piece move is not a valid inbound move", () => {
			const tile = new Tile("restricted", [tileMove], []);
			const coord = [2, 2];
			const specialTiles = new Map([[coord, tile]]);
			const board = new Board("b", "rect", [8, 8], specialTiles);
			const multiMovePiece = new Piece(
				"multi",
				{ src: "", verified: false },
				[
					tileMove,
					{
						attributes: {
							type: moveMovementType.jump,
							reflection: "none",
							initialMove: "optional",
							capturing: "optional"
						},
						movements: [{ direction: moveDirection.down, distance: 1 }],
					},
				],
				["direct", "direct"]
			);
			const game = new Game("g", board, new InstancePieceMap(), 2);
			expect(game.getBlockedTiles(multiMovePiece)).toHaveLength(1);
		});
		test("returns empty when the board has no special tiles", () => {
			const game = makeGame();
			expect(game.getBlockedTiles(slidePiece)).toHaveLength(0);
		});
	});

	describe("calculateMoves", () => {
		test("returns empty array when no piece exists at the location", () => {
			const game = makeGame();
			expect(game.calculateMoves([3, 3], moveDirection.up)).toEqual([]);
		});
		test("returns valid moves for a piece on a rect board", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const moves = game.calculateMoves([3, 3], moveDirection.up);
			expect(moves).toHaveLength(1);
			expect(moves[0].landing).toEqual([3, 2]);
		});
	});

	describe("verifyPieces", () => {
		test("returns the same game when all pieces are in bounds", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			expect(game.verifyPieces()).toBe(game);
		});
		test("removes pieces that are out of bounds for the board", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const smallBoard = new Board("b", "rect", [2, 2]);
			const game = new Game("g", smallBoard, pieces, 2);
			const result = game.verifyPieces();
			expect(result.pieces.getInstancePiece([3, 3])).toBeUndefined();
		});
	});

	describe("createInstance", () => {
		test("returns an Instance with the same board and pieces", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const instance = game.createInstance();
			expect(instance).toBeInstanceOf(Instance);
			expect(instance.piecesRecord.getInstancePiece([3, 3])).toBeDefined();
		});
	});

	describe("toJSON", () => {
		test("serializes the game fields correctly", () => {
			const game = makeGame();
			const json = game.toJSON();
			expect(json.id).toBe(game.id);
			expect(json.name).toBe("g");
			expect(json.numTeams).toBe(2);
			expect(json.board).toBeDefined();
			expect(json.pieces).toBeDefined();
		});
	});

	describe("fromJSON", () => {
		test("reconstructs a game from its JSON", () => {
			const pieces = new InstancePieceMap().setPiece([3, 3], slidePiece, 1);
			const game = makeGame(pieces);
			const restored = Game.fromJSON(game.toJSON());
			expect(restored.id).toBe(game.id);
			expect(restored.name).toBe(game.name);
			expect(restored.numTeams).toBe(game.numTeams);
			expect(restored.pieces.getInstancePiece([3, 3])).toBeDefined();
		});
	});
});
