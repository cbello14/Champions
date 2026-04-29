import { useCallback, useState } from 'react';

import { BoardDrawing } from '@/types/boardDrawing';

import BoardGeneric from './BoardGeneric';

import type { Coordinate } from '@/features/boards/board';
import type { Piece } from '@/features/pieces/piece';
import type { BoardDrawingParams } from '@/types/boardDrawing';
import type { MoveCalculationResult } from '@/types/moveCalculation';

const BoardPiece = ({
  cellWidth,
  moves,
  captures,
  piece,
  location,
}: {
  cellWidth: number;
  moves: Coordinate[];
  captures: Coordinate[];
  piece: Piece;
  location: Coordinate;
}) => {
  const [selected, setSelected] = useState<Coordinate | null>(null);

  // TODO: create a move calculation method, that will provide us the proper captures for these moves even without there being pieces
  const moveResults: MoveCalculationResult[] = moves.map((move, index) => ({
    landing: move,
    capturing: captures[index],
  }));

  const drawingFunction = useCallback(
    (params: BoardDrawingParams) => {
      BoardDrawing.boardColoring(params, selected);
      BoardDrawing.boardMoveCaptures(params, moveResults);
      BoardDrawing.boardPiece(params, piece, location, 1);
    },
    [location, moveResults, piece, selected]
  );

  return (
    <BoardGeneric
      cellWidth={cellWidth}
      dimensions={[9, 9]}
      drawingFunction={drawingFunction}
      selected={selected}
      setSelected={setSelected}
      shape="rect"
    />
  );
};

export default BoardPiece;
