import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import MovementMenu from './MovementMenu';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import type { Piece } from '@/features/pieces/piece';
import type { Move, MovementType, Permission, Reflect } from '@/types/move';

const MoveMenu = ({
  index,
  piece,
  move,
  setPiece,
  handleDeleteMovement,
  handleAddMovement,
  handleDeleteMove,
}: {
  index: number;
  piece: Piece;
  move: Move;
  setPiece: (piece: Piece) => void;
  handleDeleteMovement: (index: number, movementIndex: number) => void;
  handleAddMovement: (index: number) => void;
  handleDeleteMove: (index: number) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Collapsible className="border p-2 m-2">
      <div className="flex flex-row items-center justify-between">
        <Label>Move {index + 1}</Label>
        <CollapsibleTrigger>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {' '}
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-4 pt-2">
        <div className="flex flex-row items-center gap-4">
          <Label>Type:</Label>
          <Select
            value={move.attributes.type}
            onValueChange={(e) => {
              const newMove = {
                ...move,
                attributes: {
                  ...move.attributes,
                  type: e as MovementType,
                },
              };
              setPiece(piece.replaceMoveAt(newMove, index));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="jump">Jump</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Label>Reflection:</Label>
          <Select
            value={move.attributes.reflection}
            onValueChange={(e) => {
              const newMove = {
                ...move,
                attributes: {
                  ...move.attributes,
                  reflection: e as Reflect,
                },
              };
              setPiece(piece.replaceMoveAt(newMove, index));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="verical">Vertical</SelectItem>
                <SelectItem value="horizontal-vertical">Horizontal-Vertical </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Label>Can Move on Initial Move:</Label>

          <Select
            value={move.attributes.initialMove}
            onValueChange={(e) => {
              const newMove = {
                ...move,
                attributes: {
                  ...move.attributes,
                  initialMove: e as Permission,
                },
              };
              setPiece(piece.replaceMoveAt(newMove, index));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="optional">Optional</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Label>Can Move to Capture:</Label>
          <Select
            value={move.attributes.initialMove}
            onValueChange={(e) => {
              const newMove = {
                ...move,
                attributes: {
                  ...move.attributes,
                  capturing: e as Permission,
                },
              };
              setPiece(piece.replaceMoveAt(newMove, index));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="optional">Optional</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col center gap-4">
          Movements:
          {move.movements.map((movement, movementIndex) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <MovementMenu
                // eslint-disable-next-line react/no-array-index-key
                key={`Move-${index}Movement-${movementIndex}`}
                handleDeleteMovement={handleDeleteMovement}
                index={index}
                movement={movement}
                movementIndex={movementIndex}
                piece={piece}
                setPiece={setPiece}
              />
            </div>
          ))}
          <Button
            onClick={() => {
              handleAddMovement(index);
            }}
          >
            {' '}
            Add Movement{' '}
          </Button>
        </div>

        <Button
          onClick={() => {
            handleDeleteMove(index);
          }}
        >
          {' '}
          Delete Move{' '}
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MoveMenu;
