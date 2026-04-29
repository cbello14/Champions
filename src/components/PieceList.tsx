import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { bishop, king, knight, pawn, queen, rook } from '@/features/pieces/defaultPieces';
import { useStore } from '@/utils/storage';

import type { Piece } from '@/features/pieces/piece';

const PieceList = ({ onSelectPiece }: { onSelectPiece: (piece: Piece) => void }) => {
  const piecesJSON = useStore((state) => state.pieces);
  const setPiece = useStore((state) => state.setPiece);
  const getPieces = useStore((state) => state.getPieces);

  useEffect(() => {
    const existingPieces = Object.keys(piecesJSON);
    if (existingPieces.length === 0) {
      const defaults = [pawn, king, queen, knight, rook, bishop];
      defaults.forEach((p) => {
        setPiece(p);
      });
    }
  }, [piecesJSON, setPiece]);

  const pieces = getPieces();
  return (
    <div className="flex flex-col gap-4">
      {pieces.length > 0 ? (
        pieces.map((piece) => (
          <Button
            key={piece.id}
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-accent"
            variant="outline"
            onClick={() => {
              onSelectPiece(piece);
            }}
          >
            <span className="text-xs font-semibold truncate w-full">{piece.name}</span>
          </Button>
        ))
      ) : (
        <p className="col-span-full text-center text-muted-foreground py-4">
          No pieces saved in storage.
        </p>
      )}
    </div>
  );
};

export default PieceList;
