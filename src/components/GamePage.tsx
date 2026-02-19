import { useState } from "react"
import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar.tsx"
const GamePage = () => {

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);

	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<SideBar isOpen={boardsOpen} setIsOpen={(state: boolean) => { setBoardsOpen(state) }} name={"Boards"} content={<h2> Boards would go here </h2>} align={"left"} />

			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
					<Button className="m-5" type="submit"> Save </Button>
				</div>
			</main>

			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<h2> Pieces would go here </h2>} align={"right"} />
		</div >
	</>
}

export default GamePage
