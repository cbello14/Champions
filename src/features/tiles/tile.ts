import type { move } from "@/types/move";

export interface TileJSON {
    id: string;
    name: string;
    inboundMoves: move[];
    outboundMoves: move[];
    //effect: function?
}

export class Tile {
    readonly id: string;
    readonly name: string;
    readonly inboundMoves: readonly move[];
    readonly outboundMoves: readonly move[];
    //readonly effect: function?

    constructor(n = " ", inbound: move[], outbound: move[], id?: string) {
        this.id = id ?? crypto.randomUUID();
        this.name = n;
        this.inboundMoves = inbound;
        this.outboundMoves = outbound;
        //effect = foo()
    }

    //NOTE: move checkers currently only check if the move is exact
    isValidInboundMove(move: move): boolean {
        return this.inboundMoves.includes(move);
    }
    isValidOutboundMove(move: move): boolean {
        return this.outboundMoves.includes(move);
    }

    toJSON(): TileJSON {
        return { id: this.id, name: this.name, inboundMoves: [...this.inboundMoves], outboundMoves: [...this.outboundMoves] }
    }
    static fromJSON(data: TileJSON): Tile {
        return new Tile(data.name, data.inboundMoves, data.outboundMoves, data.id);
    }
}