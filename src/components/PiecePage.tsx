import { useState } from "react"
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar.tsx";
import RectBoardPiece from "./RectBoard/RectBoardPiece";
import { Piece } from "@/features/pieces/piece";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { coordinate } from "@/types/board";
import { pawn } from "@/features/pieces/defaultPieces";

import { useStore } from "@/utils/storage";

const PiecePage = () => {

	const piece: Piece = pawn
	const location: coordinate = [4, 4]
	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const moves = calculateMovesRect(piece, location, [8, 8], [], [1, -1], false)

	const savePiece = useStore((state) => state.savePiece);
	const handleClick = () => {
		savePiece(pawn);
	};

	return <>
		<div className="flex flex-row justify-between gap-4 p-4 items-start">
			<SideBar isOpen={piecesOpen} setIsOpen={(state: boolean) => { setPiecesOpen(state) }} name={"Pieces"} content={<h2> Pieces would go here </h2>} align={"left"} />
			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardPiece cellWidth={100} moves={moves} captures={[]} piece={piece} location={location} />
					<Button className="m-5" type="submit"> Save </Button>
					<Button onClick={handleClick}> Test Store </Button>
				</div>
			</main>
			<div className="flex grow-1 flex-none w-48">
				<img className="flex grow-1 object-scale-down" src="https://img.freepik.com/free-vector/chess_53876-25642.jpg?semt=ais_hybrid&w=740&q=80" />
			</div>
		</div >
	</>
}

export default PiecePage
