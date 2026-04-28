import { Tile } from "@/features/tiles/tile";
import type { move } from "@/types/move";
import { moveDirection, moveMovementType } from "@/types/move";

describe("Tile", () => {
  const testMove: move = {
    attributes: { type: moveMovementType.slide, reflection: "none", initialMove: "optional", capturing: "optional" },
    movements: [{ direction: moveDirection.up, distance: 1 }],
  };

  describe("isValidInboundMove", () => {
    test("returns true when the move is in inboundMoves", () => {
      const tile = new Tile("t", [testMove], []);
      expect(tile.isValidInboundMove(testMove)).toBe(true);
    });
    test("returns false when the move is not in inboundMoves", () => {
      const tile = new Tile("t", [], []);
      expect(tile.isValidInboundMove(testMove)).toBe(false);
    });
  });

  describe("isValidOutboundMove", () => {
    test("returns true when the move is in outboundMoves", () => {
      const tile = new Tile("t", [], [testMove]);
      expect(tile.isValidOutboundMove(testMove)).toBe(true);
    });
    test("returns false when the move is not in outboundMoves", () => {
      const tile = new Tile("t", [], []);
      expect(tile.isValidOutboundMove(testMove)).toBe(false);
    });
  });

  describe("toJSON", () => {
    test("serializes the tile fields correctly", () => {
      const tile = new Tile("special", [testMove], []);
      const json = tile.toJSON();
      expect(json.name).toBe("special");
      expect(json.id).toBe(tile.id);
      expect(json.inboundMoves).toEqual([testMove]);
      expect(json.outboundMoves).toEqual([]);
    });
  });

  describe("fromJSON", () => {
    test("reconstructs a tile from its JSON", () => {
      const tile = new Tile("special", [testMove], []);
      const restored = Tile.fromJSON(tile.toJSON());
      expect(restored.id).toBe(tile.id);
      expect(restored.name).toBe(tile.name);
      expect(restored.inboundMoves).toEqual([...tile.inboundMoves]);
      expect(restored.outboundMoves).toEqual([...tile.outboundMoves]);
    });
  });
});
