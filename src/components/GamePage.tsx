import { useState } from "react"
import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar.tsx"
import { basicGame } from "@/features/games/types/defaultGames"
import RectBoardGame from "./RectBoard/RectBoardGame"
import type { game } from "@/features/games/types/game"
const GamePage = () => {
	const game: game = basicGame

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);

	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<SideBar isOpen={boardsOpen} setIsOpen={(state: boolean) => { setBoardsOpen(state) }} name={"Boards"} content={<h2> Boards would go here </h2>} align={"left"} />

			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardGame cellWidth={100} game={game} />
					<Button className="m-5" type="submit"> Save </Button>
				</div>
			</main>

			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<h2> Pieces would go here </h2>} align={"right"} />
		</div >
	</>
}

export default GamePage
