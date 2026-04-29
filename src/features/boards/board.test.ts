import {
  Board,
  checkCoordinateArrayIncludes,
  checkCoordinateEquality,
  coordinateStringToCoordinate,
  coordinateToString,
} from '@/features/boards/board';
import { Tile } from '@/features/tiles/tile';

describe('checkCoordinateEquality', () => {
  test('returns true for equal coordinates', () => {
    expect(checkCoordinateEquality([1, 2], [1, 2])).toBe(true);
  });
  test('returns false for different coordinates', () => {
    expect(checkCoordinateEquality([1, 2], [2, 1])).toBe(false);
  });
  test('returns false when lengths differ', () => {
    expect(checkCoordinateEquality([1, 2], [1, 2, 3])).toBe(false);
  });
});

describe('coordinateToString', () => {
  test('converts a coordinate to a JSON string', () => {
    expect(coordinateToString([3, 5])).toBe('[3,5]');
  });
  test('converts an empty coordinate', () => {
    expect(coordinateToString([])).toBe('[]');
  });
});

describe('coordinateStringToCoordinate', () => {
  test('parses a valid coordinate string', () => {
    expect(coordinateStringToCoordinate('[3,5]')).toEqual([3, 5]);
  });
  test('returns null for a non-array JSON value', () => {
    expect(coordinateStringToCoordinate('{"a":1}')).toBeNull();
  });
  test('returns null for an array with non-number elements', () => {
    expect(coordinateStringToCoordinate('["a","b"]')).toBeNull();
  });
});

describe('checkCoordinateArrayIncludes', () => {
  test('returns true when the coordinate is present', () => {
    expect(
      checkCoordinateArrayIncludes(
        [
          [1, 2],
          [3, 4],
        ],
        [3, 4]
      )
    ).toBe(true);
  });
  test('returns false when the coordinate is absent', () => {
    expect(
      checkCoordinateArrayIncludes(
        [
          [1, 2],
          [3, 4],
        ],
        [5, 6]
      )
    ).toBe(false);
  });
  test('returns false for an empty array', () => {
    expect(checkCoordinateArrayIncludes([], [1, 2])).toBe(false);
  });
});

describe('Board', () => {
  describe('isLocationValid', () => {
    const board = new Board('b', 'rect', [8, 8]);

    test('returns true for a location inside bounds', () => {
      expect(board.isLocationValid([0, 0])).toBe(true);
    });
    test('returns true for the maximum valid location', () => {
      expect(board.isLocationValid([7, 7])).toBe(true);
    });
    test('returns false when a value equals the dimension size', () => {
      expect(board.isLocationValid([8, 0])).toBe(false);
    });
    test('returns false for negative values', () => {
      expect(board.isLocationValid([-1, 3])).toBe(false);
    });
    test('returns false for wrong number of dimensions', () => {
      expect(board.isLocationValid([1])).toBe(false);
    });
  });

  describe('addTile', () => {
    test('adds a tile at a valid coordinate', () => {
      const board = new Board('b', 'rect', [8, 8]);
      const coord = [2, 3];
      const tile = new Tile('t', [], []);
      const result = board.addTile(coord, tile);
      expect(result.specialTiles.get(coord)).toBe(tile);
    });
    test('returns the same board for an out-of-bounds coordinate', () => {
      const board = new Board('b', 'rect', [8, 8]);
      const result = board.addTile([9, 9], new Tile('t', [], []));
      expect(result).toBe(board);
    });
  });

  describe('removeTile', () => {
    test('removes a tile at an existing coordinate', () => {
      const coord = [2, 3];
      const tile = new Tile('t', [], []);
      const board = new Board('b', 'rect', [8, 8]);
      const withTile = board.addTile(coord, tile);
      const withoutTile = withTile.removeTile(coord);
      expect(withoutTile.specialTiles.size).toBe(0);
    });
    test('returns the same board for an out-of-bounds coordinate', () => {
      const board = new Board('b', 'rect', [8, 8]);
      const result = board.removeTile([9, 9]);
      expect(result).toBe(board);
    });
  });

  describe('changeDimensions', () => {
    test('returns a board with updated dimensions', () => {
      const board = new Board('b', 'rect', [8, 8]);
      const result = board.changeDimensions([4, 6]);
      expect([...result.dimensions]).toEqual([4, 6]);
    });
    test('preserves the board id', () => {
      const board = new Board('b', 'rect', [8, 8]);
      expect(board.changeDimensions([4, 4]).id).toBe(board.id);
    });
  });

  describe('toJSON', () => {
    test('serializes the board fields correctly', () => {
      const board = new Board('myboard', 'rect', [8, 8]);
      const json = board.toJSON();
      expect(json.name).toBe('myboard');
      expect(json.shape).toBe('rect');
      expect(json.dimensions).toEqual([8, 8]);
      expect(json.id).toBe(board.id);
      expect(json.specialTiles).toEqual([]);
    });
  });

  describe('fromJSON', () => {
    test('reconstructs a board from its JSON', () => {
      const board = new Board('myboard', 'rect', [8, 8]);
      const restored = Board.fromJSON(board.toJSON());
      expect(restored.id).toBe(board.id);
      expect(restored.name).toBe(board.name);
      expect(restored.shape).toBe(board.shape);
      expect([...restored.dimensions]).toEqual([...board.dimensions]);
    });
  });
});
