import { useState } from "react"
import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar.tsx"
import { basicGame } from "@/features/games/defaultGames"
import RectBoardGame from "./RectBoard/RectBoardGame"
import { Game } from "@/features/games/game"
import { Piece } from "@/features/pieces/piece"

const GamePage = () => {
	const game: Game = basicGame

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);
	const [action, setAction] = useState<Piece | "team" | "erase" | null>(null)


	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<SideBar isOpen={boardsOpen} setIsOpen={(state: boolean) => { setBoardsOpen(state) }} name={"Boards"} content={<h2> Boards would go here </h2>} align={"left"} />

			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardGame cellWidth={100} game={game} onClickAction={action} />
					<div className="flex flex-row justify-center">
						<Button className="m-5" onClick={() => { setAction("team") }}> Flip Team </Button>
						<Button className="m-5" onClick={() => { setAction("erase") }}> Delete Pieces </Button>
						<Button className="m-5" onClick={() => { setAction(null) }}> Stop Editing </Button>
					</div>
					<Button className="m-5" type="submit"> Save </Button>
				</div>
			</main>

			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<h2> Pieces would go here </h2>} align={"right"} />
		</div >
	</>
}

export default GamePage
