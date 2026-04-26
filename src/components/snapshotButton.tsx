import { Button } from "./ui/button";
import { Board } from "@/features/boards/board";
import { Game } from "@/features/games/game";
import { Instance } from "@/features/instances/instance";
import BoardSnapshot from "./BoardComponents/BoardSnapshot";

const SnapshotButton = ({
  snapshotItem,
  onClick,
  text,
}: {
  snapshotItem: Board | Game | Instance;
  onClick: () => void;
  text?: string;
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
    <Button onClick={onClick} className="h-auto">
      <div className="flex flex-col">
        <div>
          <BoardSnapshot cellWidth={20} board={board} pieces={pieces} />
        </div>
        {text && <span>{text}</span>}
      </div>
    </Button>
  );
};

export default SnapshotButton;
