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
        const name = data.name ? data.name : "";
        const inboundMoves = data.inboundMoves ? data.inboundMoves : [];
        const outboundMoves = data.outboundMoves ? data.outboundMoves : [];
        const id = data.id ? data.id : "";
        return new Tile(name, inboundMoves, outboundMoves, id);
    }
}