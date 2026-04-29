import { useState } from 'react';

import { toast } from 'sonner';

import SideBar from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import basicGame from '@/features/games/defaultGames';
import { Game } from '@/features/games/game';
import { useStore } from '@/utils/storage';

import BoardGame from './BoardComponents/BoardGame';
import BoardList from './BoardList';
import PieceList from './PieceList';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import type { Board } from '@/features/boards/board';
import type { Piece } from '@/features/pieces/piece';

const GamePage = () => {
  const [game, setGame] = useState<Game>(basicGame);
  const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
  const [boardsOpen, setBoardsOpen] = useState<boolean>(true);
  const [action, setAction] = useState<Piece | 'team' | 'erase' | null>(null);
  const [name, setName] = useState<string>(basicGame.name);
  const saveGame = useStore((state) => state.setGame);
  const [numPlayer, setNumPlayer] = useState<number>(2);

  const onNameChange = (newName: string) => {
    setName(newName);
    const newGame = new Game(newName, game.board, game.pieces, game.numTeams);
    setGame(newGame);
  };

  const onBoardChange = (board: Board) => {
    const newGame = new Game(game.name, board);
    setGame(newGame);
  };

  const onTeamChange = (n: number) => {
    const newGame = new Game(name, game.board, game.pieces, n);
    setGame(newGame);
  };
  return (
    <div className="flex flex-row justify-between h-full gap-4 p-4">
      <SideBar
        align="left"
        isOpen={boardsOpen}
        name="Boards"
        content={
          <BoardList
            onSelectBoard={(board) => {
              onBoardChange(board);
            }}
          />
        }
        setIsOpen={(state: boolean) => {
          setBoardsOpen(state);
        }}
      />
      <div className="flec flex-col">
        <Label> Number of Players </Label>
        <Select
          defaultValue={numPlayer.toString()}
          onValueChange={(e) => {
            setNumPlayer(Number.parseInt(e, 10));
            onTeamChange(Number.parseInt(e, 10));
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col center">
        <Input
          defaultValue={name}
          type="text"
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
        />
        <BoardGame
          cellWidth={100}
          game={game}
          numPlayer={numPlayer}
          onClickAction={action}
          setGame={setGame}
        />
        <div className="flex flex-row justify-center">
          <Button
            className="m-5"
            onClick={() => {
              setAction('team');
            }}
          >
            {' '}
            Flip Team{' '}
          </Button>
          <Button
            className="m-5"
            onClick={() => {
              setAction('erase');
            }}
          >
            {' '}
            Delete Pieces{' '}
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
            toast('Game Saved', { position: 'top-center' });
            saveGame(game);
          }}
        >
          {' '}
          Save{' '}
        </Button>
      </div>

      <SideBar
        align="right"
        isOpen={piecesOpen}
        name="Pieces"
        content={
          <PieceList
            onSelectPiece={(piece) => {
              setAction(piece);
            }}
          />
        }
        setIsOpen={(state: boolean) => {
          setPiecesOpen(state);
        }}
      />
    </div>
  );
};

export default GamePage;
