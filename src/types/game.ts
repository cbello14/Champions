import type { BoardJSON } from "@/types/board";
import type { InstancePieceMapJSON } from "@/types/instancePieceMap";

export interface GameJSON {
	id: string
	name: string;
	board: BoardJSON,
	pieces: InstancePieceMapJSON
}
