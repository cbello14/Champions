import { Piece } from "./piece";

export const pawn: Piece = {
	name: 'Pawn',
	moves: [
		{ attributes: { type: '$', initialMove: true }, movements: [{ distance: 2, direction: '^' }] },
		{ attributes: { type: '$' }, movements: [{ distance: 1, direction: '^' }] }
	],
	captures: [],
	image: ""
};

export const knight: Piece = {
	name: 'Knight',
	moves: [
		{
			attributes: { type: '~', reflection: 'hv' },
			movements: [{ distance: 2, direction: '^' }, { distance: 1, direction: '>' }]
		},
		{
			attributes: { type: '~', reflection: 'hv' },
			movements: [{ distance: 1, direction: '^' }, { distance: 2, direction: '>' }]
		}
	],
	captures: [],
	image: ""
};

export const bishop: Piece = {
	name: 'Bishop',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	captures: [],
	image: ""
};

export const rook: Piece = {
	name: 'Rook',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] }
	],
	captures: [],
	image: ""
};

export const queen: Piece = {
	name: 'Queen',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	captures: [],
	image: ""
};

export const king: Piece = {
	name: 'King',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '/^' }] }
	],
	captures: [],
	image: ""
};

