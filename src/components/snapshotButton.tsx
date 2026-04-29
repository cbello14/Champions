import { Board } from '@/features/boards/board';
import { Game } from '@/features/games/game';

import BoardSnapshot from './BoardComponents/BoardSnapshot';
import { Button } from './ui/button';

import type { Instance } from '@/features/instances/instance';

const SnapshotButton = ({
  snapshotItem,
  onClick,
  text,
}: {
  snapshotItem: Board | Game | Instance;
  onClick: () => void;
  text: string | undefined;
}) => {
  let board;
  let pieces;
  if (snapshotItem instanceof Board) {
    board = snapshotItem;
    pieces = undefined;
  } else if (snapshotItem instanceof Game) {
    board = snapshotItem.board;
    pieces = snapshotItem.pieces;
  } else {
    board = snapshotItem.board;
    pieces = snapshotItem.piecesRecord;
  }

  return (
    <Button className="h-auto" onClick={onClick}>
      <div className="flex flex-col">
        <div>
          <BoardSnapshot board={board} cellWidth={20} pieces={pieces} />
        </div>
        {text ? <span>{text}</span> : null}
      </div>
    </Button>
  );
};

export default SnapshotButton;
