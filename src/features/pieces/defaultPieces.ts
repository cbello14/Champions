import { moveDirection, moveMovementType, moveReflect } from '@/types/move';

import { Piece } from './piece';

export const pawn = new Piece(
  'Pawn',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: 'none',
        initialMove: 'required',
        capturing: 'disabled',
      },
      movements: [{ distance: 2, direction: moveDirection.up }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: 'none',
        initialMove: 'optional',
        capturing: 'disabled',
      },
      movements: [{ distance: 1, direction: moveDirection.up }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontal,
        initialMove: 'optional',
        capturing: 'required',
      },
      movements: [{ distance: 1, direction: moveDirection.upright }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontal,
        initialMove: 'optional',
        capturing: 'required',
      },
      movements: [{ distance: 1, direction: moveDirection.upright }],
    },
  ],
  ['no-capture', 'no-capture', 'direct', [{ distance: 1, direction: moveDirection.down }]]
);

export const knight = new Piece(
  'Knight',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.jump,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [
        { distance: 2, direction: moveDirection.up },
        { distance: 1, direction: moveDirection.right },
      ],
    },
    {
      attributes: {
        type: moveMovementType.jump,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [
        { distance: 1, direction: moveDirection.up },
        { distance: 2, direction: moveDirection.right },
      ],
    },
  ],
  ['direct', 'direct']
);

export const bishop = new Piece(
  'Bishop',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.upright }],
    },
  ],
  ['direct']
);

export const rook = new Piece(
  'Rook',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.up }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.right }],
    },
  ],
  ['direct', 'direct']
);

export const queen = new Piece(
  'Queen',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.up }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.right }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: Infinity, direction: moveDirection.upright }],
    },
  ],
  ['direct', 'direct', 'direct']
);

export const king = new Piece(
  'King',
  { src: '', verified: false },
  [
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: 1, direction: moveDirection.up }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: 1, direction: moveDirection.right }],
    },
    {
      attributes: {
        type: moveMovementType.slide,
        reflection: moveReflect.horizontalvertical,
        initialMove: 'optional',
        capturing: 'optional',
      },
      movements: [{ distance: 1, direction: moveDirection.upright }],
    },
  ],
  ['direct', 'direct', 'direct']
);
