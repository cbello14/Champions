import type { BoardJSON } from "@/types/board";
import type { InstancePieceMapJSON } from "@/types/instancePieceMap";

export type GameJSON = {
  name: string;
  board: BoardJSON,
  pieces: InstancePieceMapJSON
};