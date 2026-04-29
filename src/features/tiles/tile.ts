import type { Move } from '@/types/move';

export interface TileJSON {
  id: string;
  name: string;
  inboundMoves: Move[];
  outboundMoves: Move[];
  // effect: function?
}

export class Tile {
  readonly id: string;

  readonly name: string;

  readonly inboundMoves: readonly Move[];

  readonly outboundMoves: readonly Move[];
  // readonly effect: function?

  constructor(n: string, inbound: Move[], outbound: Move[], id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.name = n;
    this.inboundMoves = inbound;
    this.outboundMoves = outbound;
    // effect = foo()
  }

  // NOTE: move checkers currently only check if the move is exact
  isValidInboundMove(move: Move): boolean {
    return this.inboundMoves.includes(move);
  }

  isValidOutboundMove(move: Move): boolean {
    return this.outboundMoves.includes(move);
  }

  toJSON(): TileJSON {
    return {
      id: this.id,
      name: this.name,
      inboundMoves: [...this.inboundMoves],
      outboundMoves: [...this.outboundMoves],
    };
  }

  static fromJSON(data: TileJSON): Tile {
    const name = data.name ? data.name : '';
    const inboundMoves = data.inboundMoves ? data.inboundMoves : [];
    const outboundMoves = data.outboundMoves ? data.outboundMoves : [];
    const id = data.id ? data.id : '';
    return new Tile(name, inboundMoves, outboundMoves, id);
  }
}
