import { useState } from 'react';

import { toast } from 'sonner';

import SideBar from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Piece } from '@/features/pieces/piece';
import { useDebounce } from '@/hooks/use-debounce';
import { moveDirection, moveMovementType, moveReflect } from '@/types/move';
import { calculateMovesRect } from '@/types/moveCalculation';
import { useStore } from '@/utils/storage';
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip"

import BoardPiece from './BoardComponents/BoardPiece';
import MoveMenu from './MoveMenu';
import PieceSideBar from './PieceSideBar';
import { Input } from './ui/input';

import type { Coordinate } from '@/features/boards/board';
import type { VerifiedImage } from '@/features/pieces/piece';

const PiecePage = () => {
  const [piece, setPiece] = useState<Piece>(new Piece('New Piece'));
  const location: Coordinate = [4, 4];
  const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(piece.image.src);
  const moves = calculateMovesRect(piece, location, [9, 9], [], [], moveDirection.up, false);

  const piecesJSON = useStore((state) => state.pieces);
  const pieces = Object.fromEntries(
    Object.entries(piecesJSON).map(([k, v]) => [k, Piece.fromJSON(v)])
  );
  const savePiece = useStore((state) => state.setPiece);
  const deletePiece = useStore((state) => state.deletePiece);

  const handleSave = () => {
    toast('Piece Saved', { position: 'top-center' });
    savePiece(piece);
  };
  const handleDelete = () => {
    deletePiece(piece.id);
    toast('Piece Deleted', { position: 'top-center' });
    setPiece(new Piece('New Piece'));
  };

  const handleAddMove = () => {
    setPiece(
      piece.addMove({
        attributes: {
          type: moveMovementType.slide,
          reflection: moveReflect.horizontal,
          initialMove: 'optional',
          capturing: 'optional',
        },
        movements: [],
      })
    );
  };

  const handleDeleteMove = (moveIndex: number) => {
    setPiece(piece.removeMoveAt(moveIndex));
  };

  const handleAddMovement = (ind: number) => {
    setPiece(
      piece.addMovement(ind, {
        distance: 1,
        direction: moveDirection.up,
      })
    );
  };

  const handleDeleteMovement = (moveInd: number, movementInd: number) => {
    setPiece(piece.removeMovementAt(moveInd, movementInd));
  };

  const changePiece = (newPiece: Piece) => {
    setPiece(newPiece);
    setImageUrl(newPiece.image.src);
  };

  const verifyImageUrl = (url: string) => {
    const image: VerifiedImage = { src: url, verified: false };
    const img = new Image();
    img.src = url;
    img.onload = () => {
      image.verified = true;
      setPiece(piece.replaceImage(image));
    };
    img.onerror = () => {
      setPiece(piece.replaceImage(image));
    };
  };

  const debounceVerifyImageUrl = useDebounce(verifyImageUrl, 1500);

  const changeImageURL = (url: string) => {
    setImageUrl(url);
    debounceVerifyImageUrl(url);
  };

  return (
    <div className="flex flex-row justify-between gap-4 p-4 items-start">
      <SideBar
        align="left"
        content={<PieceSideBar pieces={Object.values(pieces)} setPiece={changePiece} />}
        isOpen={piecesOpen}
        name="Pieces"
        setIsOpen={(state: boolean) => {
          setPiecesOpen(state);
        }}
      />

      <main className="flex grow-5 items-center justify-center">
        <div className="flex flex-col center">
          <BoardPiece
            captures={[]}
            cellWidth={100}
            location={location}
            moves={moves.map((result) => result.landing)}
            piece={piece}
          />
        </div>
      </main>
      <div className="flex grow-2 items-center justify-center">
        <div className="flex flex-col center gap-4">
          <div className="flex flex-row items-center">
            <Label className="pr-4">Name:</Label>
            <Input
              placeholder="Default Name"
              type="text"
              value={piece.name}
              onChange={(e) => {
                setPiece(
                  new Piece(
                    e.target.value,
                    piece.image,
                    [...piece.moves],
                    [...piece.captures],
                    piece.id
                  )
                );
              }}
            />
            <Button className="m-5" onClick={handleSave}>
              {' '}
              Save Piece{' '}
            </Button>
            <Button className="m-5" onClick={handleDelete}>
              {' '}
              Delete Piece
            </Button>
          </div>
          
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-row items-center">
                <Label className="pr-4">Image URL:</Label>
                <Input
                  placeholder="Image URL"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    changeImageURL(e.target.value);
                  }}
                /></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add an image to the Piece</p>
              </TooltipContent>
            </Tooltip>
          
          {imageUrl && !piece.image.verified ? (
            <span className="text-red-500 text-sm">Invalid image URL</span>
          ) : null}
          {piece.moves.map((move, index) => (
            <MoveMenu
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              handleAddMovement={handleAddMovement}
              handleDeleteMove={handleDeleteMove}
              handleDeleteMovement={handleDeleteMovement}
              index={index}
              move={move}
              piece={piece}
              setPiece={setPiece}
            />
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleAddMove}> Add Move </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new Move to the Piece</p>
            </TooltipContent>
          </Tooltip>

        </div>
      </div>
    </div>
  );
};

export default PiecePage;
