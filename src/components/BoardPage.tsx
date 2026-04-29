import { useState } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Board } from '@/features/boards/board';
import { useStore } from '@/utils/storage';

import BoardBasic from './BoardComponents/BoardBasic';
import BoardList from './BoardList';
import SideBar from './SideBar';
import { Label } from './ui/label';

import type { Shape } from '@/features/boards/board';

const BoardPage = () => {
  const [board, setBoard] = useState<Board>(new Board('New Board'));
  const [boardsOpen, setBoardsOpen] = useState<boolean>(true);
  const [action, setAction] = useState<'tile' | null>(null);
  const saveBoard = useStore((state) => state.setBoard);

  const onNameChange = (name: string) => {
    const newBoard = board.changeName(name);
    setBoard(newBoard);
  };

  const onXChange = (x: number) => {
    const newBoard = board.changeDimensions([x, board.dimensions[1]]);
    setBoard(newBoard);
  };

  const onYChange = (y: number) => {
    const newBoard = board.changeDimensions([board.dimensions[0], y]);
    setBoard(newBoard);
  };

  const onShapeChange = (s: Shape) => {
    setBoard(board.changeShape(s));
  };

  return (
    <div className="flex flex-row p-4">
      <SideBar
        align="left"
        isOpen={boardsOpen}
        name="Boards"
        content={
          <div className="flex flex-col justify-center gap-4">
            <BoardList onSelectBoard={setBoard} />
            <Button
              onClick={() => {
                setBoard(new Board('New Board'));
              }}
            >
              {' '}
              New Board{' '}
            </Button>
          </div>
        }
        setIsOpen={(state: boolean) => {
          setBoardsOpen(state);
        }}
      />
      <main className="flex grow-5 items-center justify-center">
        <div className="flex flex-col center">
          <Card className="m-5">
            <CardHeader className="flex flex-row items-center">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                  <Label> Name: </Label>
                  <Input
                    type="text"
                    value={board.name}
                    onChange={(e) => {
                      onNameChange(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Label> Dimensions: </Label>
                  <Input
                    min={1}
                    placeholder="8"
                    type="number"
                    value={board.dimensions[0]}
                    onChange={(e) => {
                      onXChange(parseInt(e.target.value, 10));
                    }}
                  />
                  <X size={50} />
                  <Input
                    min={1}
                    placeholder="8"
                    type="number"
                    value={board.dimensions[1]}
                    onChange={(e) => {
                      onYChange(parseInt(e.target.value, 10));
                    }}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <Label> Shape: </Label>
                  <Select
                    defaultValue={board.shape}
                    onValueChange={(v: Shape) => {
                      onShapeChange(v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rect">Rectangle</SelectItem>
                      <SelectItem value="hex">Hexagon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>

          <BoardBasic
            board={board}
            cellWidth={100}
            dimensions={[...board.dimensions]}
            onClickAction={action}
            setBoard={setBoard}
          />
          <div className="flex flex-row justify-center">
            <Button
              className="m-5"
              onClick={() => {
                setAction('tile');
              }}
            >
              {' '}
              Block / Unblock Tile{' '}
            </Button>
            <Button
              className="m-5"
              onClick={() => {
                setAction(null);
              }}
            >
              {' '}
              Stop Editing{' '}
            </Button>
          </div>
          <Button
            className="m-5"
            type="submit"
            onClick={() => {
              toast('Board Saved', { position: 'top-center' });
              saveBoard(board);
            }}
          >
            {' '}
            Save{' '}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
