import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import SideBar from "@/components/SideBar.tsx";
import RectBoardPiece from "./RectBoard/RectBoardPiece";
import { Piece } from "@/features/pieces/piece";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { coordinate } from "@/features/boards/board";
import { useStore } from "@/utils/storage";
import { moveDirection, moveMovementType, moveReflect } from "@/types/move";
import PieceSideBar from "./ourUI/PieceSideBar";
import MoveMenu from "./ourUI/MoveMenu";

const PiecePage = () => {
	const [piece, setPiece] = useState<Piece>(new Piece("New Piece"));
	const location: coordinate = [4, 4]
	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const moves = calculateMovesRect(piece, location, [8, 8], [], [], moveDirection.up, false)

	const piecesJSON = useStore((state) => state.pieces);
	const pieces = Object.fromEntries(
		Object.entries(piecesJSON).map(([k, v]) => [k, Piece.fromJSON(v)])
	);
	const savePiece = useStore((state) => state.setPiece);
	const deletePiece = useStore((state) => state.deletePiece);

	const handleSave = () => {
		savePiece(piece);
	};
	const handleDelete = () => {
		deletePiece(piece.id);
		setPiece(new Piece("New Piece"))
	};

	const handleAddMove = () => {
		setPiece(piece.addMove({
			attributes: {
				type: moveMovementType.slide,
				reflection: moveReflect.horizontal,
				initialMove: false,
				capturing: false
			},
			movements: []
		}))
	};

	const handleAddMovement = (ind: number) => {
		const newMoves = [...piece.moves];
		newMoves[ind].movements.push({
			distance: 1,
			direction: moveDirection.up
		});
		setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));

	};
	const handleDeleteMovement = (moveInd: number, movementInd: number) => {
		const newMovements = piece.moves[moveInd].movements.filter((_, i) => i != movementInd);
		const newMoves = [...piece.moves];
		newMoves[moveInd] = {
			...newMoves[moveInd],
			movements: newMovements
		};
		setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
	};

	return <>
		<div className="flex flex-row justify-between gap-4 p-4 items-start">

			<SideBar
				isOpen={piecesOpen}
				setIsOpen={(state: boolean) => { setPiecesOpen(state) }}
				name={"Pieces"}
				content={<PieceSideBar
					pieces={Object.values(pieces)}
					setPiece={setPiece}
				/>
				}
				align={"left"}
			/>

			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardPiece cellWidth={100} moves={moves.map(result => result.landing)} captures={[]} piece={piece} location={location} />

				</div>
			</main>
			<div className="flex grow-2 items-center justify-center">
				<div className="flex flex-col center">
					<div className="flex flex-row">
						<Button className="m-5" onClick={handleSave} > Save Piece </Button>
						<Button className="m-5" onClick={handleDelete}> Delete Piece</Button>
						<label className="pr-4">Name:</label>
						<Input
							placeholder="Default Name"
							type="text"
							value={piece.name}
							onChange={(e) => {
								setPiece(new Piece(e.target.value, piece.image, [...piece.moves], [...piece.captures]));
							}}
						/>
					</div>


					<img src={piece.image} />
					{
						piece.moves.map((move, index) => (
							<MoveMenu
								index={index}
								piece={piece}
								move={move}
								setPiece={setPiece}
								handleDeleteMovement={handleDeleteMovement}
								handleAddMovement={handleAddMovement}
								handleDeleteMove={handleAddMove}
							/>
						))
					}
					<Button onClick={handleAddMove}> Add Move </Button>
				</div>
			</div>
		</div >
	</>
}

export default PiecePage
