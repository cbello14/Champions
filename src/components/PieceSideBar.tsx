import { Piece } from '@/features/pieces/piece';

import { Button } from './ui/button';

const PieceSideBar = ({
  pieces,
  setPiece,
}: {
  pieces: Piece[];
  setPiece: (piece: Piece) => void;
}) => (
  <div className="flex flex-col center">
    <Button
      key="add-piece"
      className="m-1"
      onClick={() => {
        setPiece(new Piece('New Piece'));
      }}
    >
      Add Piece
    </Button>
    {Object.values(pieces).map((p) => (
      <Button
        key={p.id}
        className="m-1"
        onClick={() => {
          setPiece(p);
        }}
      >
        {p.name}
      </Button>
    ))}
  </div>
);

export default PieceSideBar;
