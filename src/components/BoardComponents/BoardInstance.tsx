import { useCallback, useState } from 'react';

import { checkCoordinateEquality } from '@/features/boards/board';
import { BoardDrawing } from '@/types/boardDrawing';
import { moveDirection } from '@/types/move';

import BoardGeneric from './BoardGeneric';

import type { Coordinate } from '@/features/boards/board';
import type { Instance } from '@/features/instances/instance';
import type { BoardDrawingParams } from '@/types/boardDrawing';
import type { MoveCalculationResult } from '@/types/moveCalculation';

const BoardInstance = ({
  cellWidth,
  instance,
  setInstance,
  currentTeam,
  nextTeam,
}: {
  cellWidth: number;
  instance: Instance;
  setInstance: (instance: Instance) => void;
  currentTeam: number;
  nextTeam: () => void;
}) => {
  const [selected, setSelected] = useState<Coordinate | null>(null);
  // made this into a callback because it was causing a issue with drawingFunction, would be better to figure out a different solution
  const directional = useCallback((teamNumber: number | undefined) => {
    if (!teamNumber) return moveDirection.down;
    switch (teamNumber) {
      case 1:
        return moveDirection.up;
      case 2:
        return moveDirection.right;
      case 3:
        return moveDirection.left;
      default:
        return moveDirection.down;
    }
  }, []);

  const changeSelected = (newSelected: Coordinate | null) => {
    if (selected && newSelected) {
      const prevSelectedPiece = instance.piecesRecord.getInstancePiece(selected);
      if (prevSelectedPiece?.team === currentTeam) {
        const direction = directional(prevSelectedPiece.team);
        const moves = instance.calculateMoves(selected, direction);
        const selectedMove = moves.find((moveResult) =>
          checkCoordinateEquality(moveResult.landing, newSelected)
        );
        if (selectedMove) {
          setInstance(instance.movePiece(selected, selectedMove));
          nextTeam();
          return;
        }
      }
    }
    setSelected(newSelected);
  };

  const drawingFunction = useCallback(
    (params: BoardDrawingParams) => {
      BoardDrawing.boardColoring(params, selected);
      BoardDrawing.boardSpecialTiles(params, instance.board);
      let moves: MoveCalculationResult[] = [];
      if (selected) {
        const selectedPiece = instance.piecesRecord.getInstancePiece(selected);
        const direction = directional(selectedPiece?.team);
        moves = instance.calculateMoves(selected, direction);
      }
      BoardDrawing.boardMoveCaptures(params, moves);
      BoardDrawing.boardInstance(params, instance);
    },
    [directional, instance, selected]
  );

  return (
    <BoardGeneric
      cellWidth={cellWidth}
      dimensions={instance.board.dimensions}
      drawingFunction={drawingFunction}
      selected={selected}
      setSelected={changeSelected}
      shape={instance.board.shape}
    />
  );
};

export default BoardInstance;
