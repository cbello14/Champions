import { useCallback } from 'react';

import { coordinateToString } from '@/features/boards/board';
import { BoardDrawing } from '@/types/boardDrawing';

import BoardGeneric from './BoardGeneric';
import { Label } from '../ui/label';

import type { Board, Coordinate } from '@/features/boards/board';
import type { BoardDrawingParams } from '@/types/boardDrawing';
import type { InstancePieceMap } from '@/types/instancePiece';

const BoardSnapshot = ({
  cellWidth,
  board,
  pieces,
}: {
  cellWidth: number;
  board: Board;
  pieces: InstancePieceMap | undefined;
}) => {
  const ignoreSelected = (newSelected: Coordinate | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newSelected === null;
  };

  const drawingFunction = useCallback(
    (params: BoardDrawingParams) => {
      BoardDrawing.boardColoring(params, null);
      BoardDrawing.boardSpecialTiles(params, board);
      if (pieces) BoardDrawing.boardPieces(params, pieces);
    },
    [board, pieces]
  );

  return (
    <div className="flex flex-col items-center">
      <BoardGeneric
        cellWidth={cellWidth}
        dimensions={board.dimensions}
        drawingFunction={drawingFunction}
        selected={null}
        setSelected={ignoreSelected}
        shape={board.shape}
      />
      <Label>{board.name} </Label>
      <Label>{coordinateToString([...board.dimensions])} </Label>
    </div>
  );
};

export default BoardSnapshot;
