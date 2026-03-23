//I have made these seperate for future scaling - like sometimes this move captures sometimes it doesn't etc etc
import type { move } from "@/types/move"
import type { capture } from "@/types/capture";

export class Piece {
	name: string;
	image: string;//html
	moves: move[];
	captures: capture[];
	constructor(name = "Pawn", image = "", m: move[] = [], c: capture[] = []) {
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

};

