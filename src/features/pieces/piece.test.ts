import { Piece } from '@/features/pieces/piece';
import { moveDirection, moveMovementType } from '@/types/move';

import type { Move } from '@/types/move';

const moveA: Move = {
  attributes: {
    type: moveMovementType.slide,
    reflection: 'none',
    initialMove: 'optional',
    capturing: 'optional',
  },
  movements: [{ direction: moveDirection.up, distance: 1 }],
};

const moveB: Move = {
  attributes: {
    type: moveMovementType.jump,
    reflection: 'none',
    initialMove: 'optional',
    capturing: 'optional',
  },
  movements: [{ direction: moveDirection.right, distance: 2 }],
};

describe('Piece', () => {
  describe('addMove', () => {
    test('appends a move with a default direct capture', () => {
      const piece = new Piece('p', { src: '', verified: false }, [], []);
      const result = piece.addMove(moveA);
      expect(result.moves).toHaveLength(1);
      expect(result.moves[0]).toBe(moveA);
      expect(result.captures[0]).toBe('direct');
    });
    test('appends a move with the provided capture', () => {
      const piece = new Piece('p', { src: '', verified: false }, [], []);
      const result = piece.addMove(moveA, 'no-capture');
      expect(result.captures[0]).toBe('no-capture');
    });
    test('preserves existing moves', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      const result = piece.addMove(moveB);
      expect(result.moves).toHaveLength(2);
      expect(result.moves[0]).toBe(moveA);
      expect(result.moves[1]).toBe(moveB);
    });
    test('preserves the piece id', () => {
      const piece = new Piece('p', { src: '', verified: false }, [], []);
      expect(piece.addMove(moveA).id).toBe(piece.id);
    });
  });

  describe('removeMoveAt', () => {
    test('removes the move at the given index', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.removeMoveAt(0);
      expect(result.moves).toHaveLength(1);
      expect(result.moves[0]).toBe(moveB);
    });
    test('removes the corresponding capture at the same index', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.removeMoveAt(0);
      expect(result.captures[0]).toBe('no-capture');
    });
    test('preserves the piece id', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      expect(piece.removeMoveAt(0).id).toBe(piece.id);
    });
  });

  describe('removeMove', () => {
    test('removes the move by reference', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.removeMove(moveA);
      expect(result.moves).toHaveLength(1);
      expect(result.moves[0]).toBe(moveB);
    });
    test('removes the corresponding capture', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.removeMove(moveA);
      expect(result.captures[0]).toBe('no-capture');
    });
  });

  describe('replaceMoveAt', () => {
    test('replaces the move at the given index', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      const result = piece.replaceMoveAt(moveB, 0);
      expect(result.moves[0]).toBe(moveB);
    });
    test('leaves other moves unchanged', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.replaceMoveAt(moveB, 0);
      expect(result.moves[1]).toBe(moveB);
    });
    test('preserves the piece id', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      expect(piece.replaceMoveAt(moveB, 0).id).toBe(piece.id);
    });
  });

  describe('addMovement', () => {
    test('appends a movement to the move at the given index', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [{ ...moveA, movements: [{ direction: moveDirection.up, distance: 1 }] }],
        ['direct']
      );
      const newMovement = { direction: moveDirection.right, distance: 1 };
      const result = piece.addMovement(0, newMovement);
      expect(result.moves[0].movements).toHaveLength(2);
      expect(result.moves[0].movements[1]).toEqual(newMovement);
    });
    test('preserves the piece id', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [{ ...moveA, movements: [{ direction: moveDirection.up, distance: 1 }] }],
        ['direct']
      );
      expect(piece.addMovement(0, { direction: moveDirection.right, distance: 1 }).id).toBe(
        piece.id
      );
    });
  });

  describe('removeMovementAt', () => {
    test('removes the movement at the given index from the specified move', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [
          {
            attributes: {
              type: moveMovementType.slide,
              reflection: 'none',
              initialMove: 'optional',
              capturing: 'optional',
            },
            movements: [
              { direction: moveDirection.up, distance: 1 },
              { direction: moveDirection.right, distance: 1 },
            ],
          },
        ],
        ['direct']
      );
      const result = piece.removeMovementAt(0, 0);
      expect(result.moves[0].movements).toHaveLength(1);
      expect(result.moves[0].movements[0].direction).toBe(moveDirection.right);
    });
    test('preserves the piece id', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [
          {
            attributes: {
              type: moveMovementType.slide,
              reflection: 'none',
              initialMove: 'optional',
              capturing: 'optional',
            },
            movements: [
              { direction: moveDirection.up, distance: 1 },
              { direction: moveDirection.right, distance: 1 },
            ],
          },
        ],
        ['direct']
      );
      expect(piece.removeMovementAt(0, 0).id).toBe(piece.id);
    });
  });

  describe('replaceCaptureAt', () => {
    test('replaces the capture at the given index', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      const result = piece.replaceCaptureAt('no-capture', 0);
      expect(result.captures[0]).toBe('no-capture');
    });
    test('leaves other captures unchanged', () => {
      const piece = new Piece(
        'p',
        { src: '', verified: false },
        [moveA, moveB],
        ['direct', 'no-capture']
      );
      const result = piece.replaceCaptureAt('no-capture', 0);
      expect(result.captures[1]).toBe('no-capture');
    });
    test('preserves the piece id', () => {
      const piece = new Piece('p', { src: '', verified: false }, [moveA], ['direct']);
      expect(piece.replaceCaptureAt('no-capture', 0).id).toBe(piece.id);
    });
  });

  describe('toJSON', () => {
    test('serializes the piece fields correctly', () => {
      const piece = new Piece('rook', { src: 'rook.png', verified: false }, [moveA], ['direct']);
      const json = piece.toJSON();
      expect(json.id).toBe(piece.id);
      expect(json.name).toBe('rook');
      expect(json.image).toEqual({ src: 'rook.png', verified: false });
      expect(json.moves).toEqual([moveA]);
      expect(json.captures).toEqual(['direct']);
    });
  });

  describe('fromJSON', () => {
    test('reconstructs a piece from its JSON', () => {
      const piece = new Piece('rook', { src: 'rook.png', verified: false }, [moveA], ['direct']);
      const restored = Piece.fromJSON(piece.toJSON());
      expect(restored.id).toBe(piece.id);
      expect(restored.name).toBe(piece.name);
      expect(restored.image).toEqual(piece.image);
      expect(restored.moves).toEqual([...piece.moves]);
      expect(restored.captures).toEqual([...piece.captures]);
    });
  });
});
