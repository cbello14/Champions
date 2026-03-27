import type { move } from "@/types/move"
import type { capture } from "@/types/capture";

export interface PieceJSON {
	id: string
	name: string;
	image: string;
	moves: move[];
	captures: capture[];
}
