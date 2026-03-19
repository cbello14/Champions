import { piece } from "./piece"

export const pawn: piece = {
	name: 'Pawn',
	moves: [
		{ attributes: { type: '$', initialMove: true }, movements: [{ distance: 2, direction: '^' }] },
		{ attributes: { type: '$' }, movements: [{ distance: 1, direction: '^' }] }
	],
	captures: []
};

export const knight: piece = {
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
	captures: []
};

export const bishop: piece = {
	name: 'Bishop',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	captures: []
};

export const rook: piece = {
	name: 'Rook',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] }
	],
	captures: []
};

export const queen: piece = {
	name: 'Queen',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	captures: []
};

export const king: piece = {
	name: 'King',
	moves: [
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '/^' }] }
	],
	captures: []
};

