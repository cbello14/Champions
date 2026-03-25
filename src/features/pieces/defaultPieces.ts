import { Piece } from "./piece";

export const pawn: Piece = new Piece(
	"Pawn",
	"",
	[
		{ attributes: { type: '$', initialMove: true }, movements: [{ distance: 2, direction: '^' }] },
		{ attributes: { type: '$' }, movements: [{ distance: 1, direction: '^' }] }
	],
	[]
)

export const knight: Piece = new Piece(
	"Knight",
	"",
	[
		{
			attributes: { type: '~', reflection: 'hv' },
			movements: [{ distance: 2, direction: '^' }, { distance: 1, direction: '>' }]
		},
		{
			attributes: { type: '~', reflection: 'hv' },
			movements: [{ distance: 1, direction: '^' }, { distance: 2, direction: '>' }]
		}
	],
	[]
)

export const bishop: Piece = new Piece(
	"Bishop",
	"",
	[
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	[],
);

export const rook: Piece = new Piece(
	"Rook",
	"",
	[
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] }
	],
	[]
);

export const queen: Piece = new Piece(
	"Queen",
	"",
	[
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 'n', direction: '/^' }] }
	],
	[]
);

export const king: Piece = new Piece(
	"King",
	"",
	[
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '^' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '>' }] },
		{ attributes: { type: '$', reflection: 'hv' }, movements: [{ distance: 1, direction: '/^' }] }
	],
	[]
);

