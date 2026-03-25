import type { move } from "@/types/move"
import type { capture } from "@/types/capture";

export type PieceJSON = {
  name: string;
  image: string;
  moves: move[];
  captures: capture[];
};