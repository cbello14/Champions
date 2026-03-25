import type { BoardJSON } from "@/types/board";
import type { InstancePieceMapJSON } from "@/types/instancePieceMap";

export interface GameJSON {
	name: string;
	board: BoardJSON,
	pieces: InstancePieceMapJSON
}
