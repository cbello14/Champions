import { useCallback, useState } from 'react';

import fullBlocker from '@/features/tiles/defaultTiles';
import { BoardDrawing } from '@/types/boardDrawing';

import BoardGeneric from './BoardGeneric';

import type { Board, Coordinate } from '@/features/boards/board';
import type { BoardDrawingParams } from '@/types/boardDrawing';

type BoardCreationActions = 'tile' | null;

const BoardBasic = ({
  dimensions,
  cellWidth,
  board,
  setBoard,
  onClickAction,
}: {
  dimensions: number[];
  cellWidth: number;
  board: Board;
  setBoard: (board: Board) => void;
  onClickAction: BoardCreationActions;
}) => {
  const [selected, setSelected] = useState<Coordinate | null>(null);

  const changeSelected = (newSelected: Coordinate | null) => {
    if (onClickAction && newSelected) {
      // problem: specialTiles key is a [number, number] but doing [number, number] == [number, number] compares by reference not value
      const specialTilesArr = Array.from(board.specialTiles.entries());
      let found = false;
      for (const [coord] of specialTilesArr) {
        if (coord[0] === newSelected[0] && coord[1] === newSelected[1]) {
          found = true;
          break;
        }
      }
      if (found) {
        setBoard(board.removeTile(newSelected));
      } else {
        setBoard(board.addTile(newSelected, fullBlocker)); // HARD CODED: SHOULD CHANGE WHEN WE HAVE USER INPUTTED TILES IMPLEMENTED
      }
    }
    setSelected(newSelected);
  };

  const drawingFunction = useCallback(
    (params: BoardDrawingParams) => {
      BoardDrawing.boardColoring(params, selected);
      BoardDrawing.boardSpecialTiles(params, board);
    },
    [board, selected]
  );

  return (
    <BoardGeneric
      cellWidth={cellWidth}
      dimensions={dimensions}
      drawingFunction={drawingFunction}
      selected={selected}
      setSelected={changeSelected}
      shape={board.shape}
    />
  );
};

export default BoardBasic;
