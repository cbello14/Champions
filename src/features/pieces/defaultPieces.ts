import { moveDirection, moveMovementType, moveReflect } from "@/types/move";
import { Piece } from "./piece";

export const pawn = new Piece(
	'Pawn',
	'',
	[
		{ attributes: { type: moveMovementType.slide, initialMove: true }, movements: [{ distance: 2, direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide }, movements: [{ distance: 1, direction: moveDirection.up }] }
	],
	[]
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
	[]
);

export const bishop = new Piece(
	'Bishop',
	'',
	[{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.upright }] }],
	[]
);

export const rook = new Piece(
	'Rook',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.right }] }
	],
	[]
);

export const queen = new Piece(
	'Queen',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.right }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 'n', direction: moveDirection.upright }] }
	],
	[]
);

export const king = new Piece(
	'King',
	'',
	[
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.up }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.right }] },
		{ attributes: { type: moveMovementType.slide, reflection: moveReflect.horizontalvertical }, movements: [{ distance: 1, direction: moveDirection.upright }] }
	],
	[]
);
