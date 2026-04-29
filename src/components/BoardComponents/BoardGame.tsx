import { useCallback, useState } from 'react';

import { BoardDrawing } from '@/types/boardDrawing';
import { moveDirection } from '@/types/move';

import BoardGeneric from './BoardGeneric';

import type { Coordinate } from '@/features/boards/board';
import type { Game } from '@/features/games/game';
import type { Piece } from '@/features/pieces/piece';
import type { BoardDrawingParams } from '@/types/boardDrawing';
import type { MoveCalculationResult } from '@/types/moveCalculation';

type GameCreationActions = Piece | 'erase' | 'team' | null;

const BoardGame = ({
  cellWidth,
  game,
  setGame,
  onClickAction,
  numPlayer,
}: {
  cellWidth: number;
  game: Game;
  setGame: (game: Game) => void;
  onClickAction: GameCreationActions;
  numPlayer: number;
}) => {
  const [selected, setSelected] = useState<Coordinate | null>(null);

  const changeSelected = (newSelected: Coordinate | null) => {
    if (onClickAction && newSelected) {
      if (onClickAction === 'team') {
        const pieceClicked = game.pieces.getInstancePiece(newSelected);
        if (pieceClicked) {
          // in here, have a +1 and modulus
          setGame(game.setTeam(newSelected, (pieceClicked.team + 1) % numPlayer));
          // setGame(game.setTeam(newSelected, pieceClicked.team === 0 ? 1 : 0))
        }
      } else if (onClickAction === 'erase') {
        setGame(game.removeInstancePiece(newSelected));
      } else {
        setGame(game.addPiece(newSelected, onClickAction, 1));
      }
    }
    setSelected(newSelected);
  };

  const drawingFunction = useCallback(
    (params: BoardDrawingParams) => {
      BoardDrawing.boardColoring(params, selected);
      let moves: MoveCalculationResult[] = [];
      if (selected && !onClickAction) {
        const selectedPiece = game.pieces.getInstancePiece(selected);
        const direction = selectedPiece?.team === 1 ? moveDirection.up : moveDirection.down;
        moves = game.calculateMoves(selected, direction);
      }
      BoardDrawing.boardSpecialTiles(params, game.board);
      BoardDrawing.boardMoveCaptures(params, moves);
      BoardDrawing.boardGame(params, game);
    },
    [game, onClickAction, selected]
  );

  return (
    <BoardGeneric
      cellWidth={cellWidth}
      dimensions={game.board.dimensions}
      drawingFunction={drawingFunction}
      selected={selected}
      setSelected={changeSelected}
      shape={game.board.shape}
    />
  );
};

export default BoardGame;
