import { useState } from "react"
import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar.tsx"
import { basicGame } from "@/features/games/defaultGames"
import { Game } from "@/features/games/game"
import { Piece } from "@/features/pieces/piece"
import PieceList from "./PieceList"
import BoardList from "./BoardList"
import type { Board } from "@/features/boards/board"
import { useStore } from "@/utils/storage"
import { Input } from "./ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "./ui/select"
import { Label } from "./ui/label"
import BoardGame from "./BoardComponents/BoardGame"
import { toast } from "sonner"


const GamePage = () => {

	const [game, setGame] = useState<Game>(basicGame)
	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);
	const [action, setAction] = useState<Piece | "team" | "erase" | null>(null)
	const [name, setName] = useState<string>(basicGame.name)
	const saveGame = useStore((state) => state.setGame)
	const [numPlayer, setPlayerCount] = useState<number>(2);

	const onNameChange = (name: string) => {
		setName(name)
		const newGame = new Game(name, game.board, game.pieces, game.numTeams)
		setGame(newGame)
	}

	const onBoardChange = (board: Board) => {
		const newGame = new Game(game.name, board)
		setGame(newGame)
	}

	const onTeamChange = (n: number) => {
		const newGame = new Game(name, game.board, game.pieces, n)
		setGame(newGame)
	}
	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<SideBar isOpen={boardsOpen} setIsOpen={(state: boolean) => { setBoardsOpen(state) }} name={"Boards"} content={<BoardList onSelectBoard={(board) => { onBoardChange(board); }} />} align={"left"} />
			<div className="flec flex-col">
				<Label> Number of Players </Label>
				<Select
					onValueChange={(e) => {
						setPlayerCount(Number.parseInt(e))
						onTeamChange(Number.parseInt(e))
					}}
					defaultValue={numPlayer.toString()}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent >
						<SelectGroup>
							<SelectItem value="2">2</SelectItem>
							<SelectItem value="3">3</SelectItem>
							<SelectItem value="4">4</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col center">
				<Input type="text" defaultValue={name} onChange={(e) => { onNameChange(e.target.value) }} />
				<BoardGame cellWidth={100} game={game} onClickAction={action} setGame={(game: Game) => { setGame(game); }} numPlayer={numPlayer} />
				<div className="flex flex-row justify-center">
					<Button className="m-5" onClick={() => { setAction("team") }}> Flip Team </Button>
					<Button className="m-5" onClick={() => { setAction("erase") }}> Delete Pieces </Button>
					<Button className="m-5" onClick={() => { setAction(null) }}> Stop Editing </Button>
				</div>
				<Button className="m-5" type="submit" onClick={() => {
					toast("Game Saved",
						{ position: "top-center" }
					)
					saveGame(game)
				}}> Save </Button>
			</div>

			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<PieceList onSelectPiece={(piece) => { setAction(piece); }} />} align={"right"} />
		</div >
	</>
}

export default GamePage
