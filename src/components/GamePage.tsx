import { useState } from "react"
import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar.tsx"
import { basicGame } from "@/features/games/defaultGames"
import RectBoardGame from "./RectBoard/RectBoardGame"
import { Game } from "@/features/games/game"
import { Piece } from "@/features/pieces/piece"
import PieceList from "./PieceList"
import BoardList from "./BoardList"
import type { Board } from "@/features/boards/board"
import { useStore } from "@/utils/storage"
import { Input } from "./ui/input"
import TeamMenu from "@/components/ourUI/TeamMenu"


const GamePage = () => {

	const [game, setGame] = useState<Game>(basicGame)
	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);
	const [action, setAction] = useState<Piece | "team" | "erase" | null>(null)
	const [name, setName] = useState<string>(basicGame.name)
	const teamIds = Object.keys(game.teams).map(Number);
	teamIds.sort();
	const [teamId, setTeamId] = useState<number>(teamIds[0]);
	const saveGame = useStore((state) => state.setGame)

	const onNameChange = (name: string) => {
		setName(name)
		const newGame = new Game(name, game.teams, game.board, game.pieces)
		setGame(newGame)
	}

	const onBoardChange = (board: Board) => {
		const newGame = new Game(game.name, game.teams, board)
		setGame(newGame)
	}

	// drop down menu to select team
	// inputs to change current team's color and direction
	// buttons to add a team and remove currently selected team

	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<SideBar isOpen={boardsOpen} setIsOpen={(state: boolean) => { setBoardsOpen(state) }} name={"Boards"} content={<BoardList onSelectBoard={(board) => { onBoardChange(board); }} />} align={"left"} />

			<div className="flex flex-col center">
				<Input type="text" defaultValue={name} onChange={(e) => { onNameChange(e.target.value) }} />
				<RectBoardGame cellWidth={100} game={game} onClickAction={action} setGame={(game: Game) => { setGame(game); }} />
				<div className="flex flex-row justify-center">
					<TeamMenu game={game} teamId={teamId} setTeamId={(id: number) => { setTeamId(id) }} />
					<Button className="m-5" onClick={() => { setAction("erase") }}> Delete Pieces </Button>
					<Button className="m-5" onClick={() => { setAction(null) }}> Stop Editing </Button>
				</div>
				<Button className="m-5" type="submit" onClick={() => { saveGame(game) }}> Save </Button>
			</div>

			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<PieceList onSelectPiece={(piece) => { setAction(piece); }} />} align={"right"} />
		</div >
	</>
}

export default GamePage
