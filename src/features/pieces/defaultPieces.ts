import { moveDirection, moveMovementType, moveReflect } from "@/types/move";
import { Piece } from "./piece";


export const pawn = new Piece(
	'Pawn',
	'',
	[
		{ attributes: { type: moveMovementType.slide, initialMove: true, capturing: false }, movements: [{ distance: 2, direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, capturing: false }, movements: [{ distance: 1, direction: moveDirection.up }] },
		{
			attributes: {
				type: moveMovementType.slide,
				reflection: moveReflect.horizontal, 
				capturing: true
			},
			movements: [{ distance: 1, direction: moveDirection.upright }]
		},
		{
			attributes: {
				type: moveMovementType.slide,
				reflection: moveReflect.horizontal,
				capturing: true
			},
			movements: [{ distance: 1, direction: moveDirection.upright }]
		}
	],
	['no-capture', 'no-capture', 'direct', [{ distance: 1, direction: moveDirection.down }]] 
);

export const knight = new Piece(
	'Knight',
	'',
	[
		{
			attributes: { type: moveMovementType.jump, reflection: moveReflect.horizontalvertical },
			movements: [{ distance: 2, direction: moveDirection.up }, { distance: 1, direction: moveDirection.right }]
		},
		{
			attributes: { type: moveMovementType.jump, reflection: moveReflect.horizontalvertical },
			movements: [{ distance: 1, direction: moveDirection.up }, { distance: 2, direction: moveDirection.right }]
		}
	],
	['direct', 'direct']
);

export const bishop = new Piece(
	'Bishop',
	'',
	[{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.upright }] }],
	['direct']
);

export const rook = new Piece(
	'Rook',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.right }] }
	],
	['direct', 'direct']
);

export const queen = new Piece(
	'Queen',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.right }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.upright }] }
	],
	['direct', 'direct', 'direct']
);

export const king = new Piece(
	'King',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.right }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.upright }] }
	],
	['direct', 'direct', 'direct']
);
