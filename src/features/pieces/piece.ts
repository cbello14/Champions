import type { move } from "@/types/move";
import type { capture } from "@/types/capture";

export interface PieceJSON {
	id: string;
	name: string;
	image: string;
	moves: move[];
	captures: capture[];
}

export class Piece {
	readonly id: string;
	readonly name: string;
	readonly image: string;
	readonly moves: readonly move[];
	readonly captures: readonly capture[];

	constructor(name = "", image = "", m: move[] = [], c: capture[] = [], id?: string) {
		this.id = id ?? crypto.randomUUID();
		this.name = name;
		this.image = image;
		this.moves = m;
		this.captures = c;
	}
	addMove(move: move, capture: capture = 'direct'): Piece {
		return new Piece(this.name, this.image, [...this.moves, move], [...this.captures, capture], this.id);
	}
	removeMoveAt(index: number): Piece {
		const newMoves = [...this.moves];
		newMoves.splice(index, 1);
		const newCaptures = [...this.captures]
		newCaptures.splice(index, 1)
		return new Piece(this.name, this.image, newMoves, newCaptures, this.id);
	}
	removeMove(move: move): Piece {
		const index = this.moves.indexOf(move);
		return this.removeMoveAt(index)
	}
	replaceMoveAt(move: move, index: number): Piece {
		const newMoves = [...this.moves];
		newMoves[index] = move;
		return new Piece(this.name, this.image, newMoves, [...this.captures], this.id);
	}
	replaceCaptureAt(capture: capture, index: number) {
		const newCaptures = [...this.captures];
		newCaptures[index] = capture;
		return new Piece(this.name, this.image, [...this.moves], newCaptures, this.id);
	}
	toJSON(): PieceJSON {
		return { id: this.id, name: this.name, image: this.image, moves: [...this.moves], captures: [...this.captures], };
	}
	static fromJSON(data: PieceJSON): Piece {
		return new Piece(data.name, data.image, data.moves, data.captures, data.id);
	}
}
