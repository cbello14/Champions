import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import SideBar from "@/components/SideBar.tsx";
import { Piece, type verifiedImage } from "@/features/pieces/piece";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { coordinate } from "@/features/boards/board";
import { useStore } from "@/utils/storage";
import { moveDirection, moveMovementType, moveReflect } from "@/types/move";
import PieceSideBar from "./PieceSideBar";
import MoveMenu from "./MoveMenu";
import BoardPiece from "./BoardComponents/BoardPiece";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

const PiecePage = () => {
  const [piece, setPiece] = useState<Piece>(new Piece("New Piece"));
  const location: coordinate = [4, 4];
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
    toast("Piece Saved", { position: "top-center" });
    savePiece(piece);
  };
  const handleDelete = () => {
    deletePiece(piece.id);
    toast("Piece Deleted", { position: "top-center" });
    setPiece(new Piece("New Piece"));
  };

  const handleAddMove = () => {
    setPiece(
      piece.addMove({
        attributes: {
          type: moveMovementType.slide,
          reflection: moveReflect.horizontal,
          initialMove: "optional",
          capturing: "optional",
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

  const changePiece = (piece: Piece) => {
    setPiece(piece);
    setImageUrl(piece.image.src);
  };

  const verifyImageUrl = (url: string) => {
    const image: verifiedImage = { src: url, verified: false };
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
    <>
      <div className="flex flex-row justify-between gap-4 p-4 items-start">
        <SideBar
          isOpen={piecesOpen}
          setIsOpen={(state: boolean) => {
            setPiecesOpen(state);
          }}
          name={"Pieces"}
          content={<PieceSideBar pieces={Object.values(pieces)} setPiece={changePiece} />}
          align={"left"}
        />

        <main className="flex grow-5 items-center justify-center">
          <div className="flex flex-col center">
            <BoardPiece
              cellWidth={100}
              moves={moves.map((result) => result.landing)}
              captures={[]}
              piece={piece}
              location={location}
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
                {" "}
                Save Piece{" "}
              </Button>
              <Button className="m-5" onClick={handleDelete}>
                {" "}
                Delete Piece
              </Button>
            </div>
            <div className="flex flex-row items-center">
              <Label className="pr-4">Image URL:</Label>
              <Input
                placeholder="Image URL"
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  changeImageURL(e.target.value);
                }}
              />
            </div>
            {imageUrl && !piece.image.verified && (
              <span className="text-red-500 text-sm">Invalid image URL</span>
            )}
            {piece.moves.map((move, index) => (
              <MoveMenu
                index={index}
                piece={piece}
                move={move}
                setPiece={setPiece}
                handleDeleteMovement={handleDeleteMovement}
                handleAddMovement={handleAddMovement}
                handleDeleteMove={handleDeleteMove}
              />
            ))}
            <Button onClick={handleAddMove}> Add Move </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PiecePage;
