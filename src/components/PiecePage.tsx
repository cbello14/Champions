import { useState } from "react"
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar.tsx";
import RectBoardPiece from "./RectBoardPiece";
import type { piece } from "@/features/pieces/types/piece";
const PiecePage = () => {

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const piece: piece = {
		name: "pawn",
		moves: [],
		captures: [],
	}

	return <>
		<div className="flex flex-row justify-between gap-4 p-4 items-start">
			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<h2> Pieces would go here </h2>} align={"left"} />
			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardPiece cellWidth={100} moves={[[0, 0], [1, 1], [2, 2], [3, 3]]} captures={[[1, 1]]} piece={piece} location={[4, 4]} />
					<Button className="m-5" type="submit"> Save </Button>
				</div>
			</main>
			<div className="flex grow-1 flex-none w-48">
				<img className="flex grow-1 object-scale-down" src="https://img.freepik.com/free-vector/chess_53876-25642.jpg?semt=ais_hybrid&w=740&q=80" />
			</div>
		</div >
	</>
}

export default PiecePage
