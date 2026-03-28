//I have made these seperate for future scaling - like sometimes this move captures sometimes it doesn't etc etc
import type { move } from "@/types/move"
import type { capture } from "@/types/capture";

export interface PieceJSON {
	id: string
	name: string;
	image: string;
	moves: move[];
	captures: capture[];
}

export class Piece {
	id: string
	name: string;
	image: string;//html
	moves: move[];
	captures: capture[];
	constructor(name = "", image = "", m: move[] = [], c: capture[] = [], id?: string) {
		this.id = id ?? crypto.randomUUID()
		this.name = name;
		this.image = image
		this.moves = m;
		this.captures = c;
	}
	addMove(move: move) {
		this.moves.push(move)
	}
	removeMoveAt(index: number) {
		this.moves.splice(index, 1)
	}
	removeMove(move: move) {
		const index = this.moves.indexOf(move)
		if (index != -1)
			this.moves.splice(index)
	}
	replaceMove(move: move, index: number) {
		this.moves[index] = move
	}

	toJSON(): PieceJSON {
		return {
			id: this.id,
			name: this.name,
			image: this.image,
			moves: this.moves,
			captures: this.captures,
		};
	}
	static fromJSON(data: PieceJSON): Piece {
		return new Piece(data.name, data.image, data.moves, data.captures, data.id);
	}
};

