import type { move } from "@/types/move";

export interface TileJSON {
    id: string;
    name: string;
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
}