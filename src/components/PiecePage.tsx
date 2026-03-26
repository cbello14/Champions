import { useState } from "react"
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar.tsx";
import RectBoardPiece from "./RectBoard/RectBoardPiece";
import { Piece } from "@/features/pieces/piece";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { coordinate } from "@/types/board";
import { useStore } from "@/utils/storage";
import type { direction, distance, movementType, reflect } from "@/types/move";

const PiecePage = () => {
	const [piece, setPiece] = useState<Piece>(new Piece());
	const location: coordinate = [4, 4]
	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const moves = calculateMovesRect(piece, location, [8, 8], [], [1, -1], false)
	
	const piecesJSON = useStore((state) => state.pieces);
	const pieces = Object.fromEntries(
		Object.entries(piecesJSON).map(([k, v]) => [k, Piece.fromJSON(v)])
	);
	const savePiece = useStore((state) => state.setPiece);

	const handleSave = () => {
		savePiece(piece);
	};

	const handleAddMove = () => {
		const newMoves = [...piece.moves];
		newMoves.push({
			attributes: {
				type: '$',
				reflection: 'h',
				initialMove: false,
				capturing: false
			},
			movements: []
		});
		setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
	};

	const handleAddMovement = (ind: number) => {
		const newMoves = [...piece.moves];
		newMoves[ind].movements.push({
			distance: 1,
			direction: '^'
		});
		setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
	};

	return <>
		<div className="flex flex-row justify-between gap-4 p-4 items-start">
			<SideBar 
				isOpen={piecesOpen} 
				setIsOpen={(state: boolean) => { setPiecesOpen(state) }} 
				name={"Pieces"} 
				content={
					<div className="flex flex-col center">
						<Button 
							key="add-piece" 
							className="m-1"
							onClick={() => setPiece(new Piece())}
						> 
							Add Piece 
						</Button>
						{
							Object.values(pieces).map((p) => (
								<Button
									key={p.name}
									className="m-1"
									onClick={() => setPiece(p)}
								>
									{p.name}
								</Button>
							))
						}
					</div>
				} 
				align={"left"} 
			/>
			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<RectBoardPiece cellWidth={100} moves={moves} captures={[]} piece={piece} location={location} />
					<Button className="m-5" onClick={handleSave}> Save </Button>
				</div>
			</main>
			<div className="flex grow-2 items-center justify-center">
				<div className="flex flex-col center">
					<label>Name:</label>
					<input
						type="text"
						value={piece.name}
						onChange={(e) => {
							setPiece(new Piece(e.target.value, piece.image, piece.moves, piece.captures));
						}}
					/>
					<img src={piece.image} />
					{
						piece.moves.map((move, index) => (
							<div key={index} className="border p-2 m-2">
								
								<div>
									<label>Type:</label>
									<select
										value={move.attributes.type}
										onChange={(e) => {
											const newMoves = [...piece.moves];
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													type: e.target.value as movementType
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
										}}
									>
										<option value="$">Slide</option>
										<option value="~">Jump</option>
									</select>
								</div>

								<div>
									<label>Reflection:</label>
									<select
										value={move.attributes.reflection}
										onChange={(e) => {
											const newMoves = [...piece.moves];
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													reflection: e.target.value as reflect
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
										}}
									>
										<option value="h">Horizontal</option>
										<option value="v">Vertical</option>
										<option value="hv">Horizontal-Vertical</option>
									</select>
								</div>

								<div>
									<label>Initial Move:</label>
									<input
										type="checkbox"
										checked={move.attributes.initialMove}
										onChange={(e) => {
											const newMoves = [...piece.moves];
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													initialMove: e.target.checked
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
										}}
									/>
								</div>

								<div>
									<label>Capturing:</label>
									<input
										type="checkbox"
										checked={move.attributes.capturing}
										onChange={(e) => {
											const newMoves = [...piece.moves];
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													capturing: e.target.checked
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
										}}
									/>
								</div>

								<div className="flex flex-col center">
									Movements:
									{
										move.movements.map((movement, movementIndex) => (
											<div>
												<label>Distance:</label>
												<input
													type="text"
													value={movement.distance}
													onChange={(e) => {
														const newMoves = [...piece.moves];
														newMoves[index].movements[movementIndex] = {
															...newMoves[index].movements[movementIndex],
															distance: e.target.value as distance
														};
														setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
													}}
												/>
												<br/>
												<label>Direction:</label>
												<select
													value={movement.direction}
													onChange={(e) => {
														const newMoves = [...piece.moves];
														newMoves[index].movements[movementIndex] = {
															...newMoves[index].movements[movementIndex],
															direction: e.target.value as direction
														};
														setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
													}}
												>
													<option value="^">Up</option>
													<option value="/^">Up-Right</option>
													<option value=">">Right</option>
													<option value="\>">Down-Right</option>
													<option value="v">Down</option>
													<option value="/v">Down-Left</option>
													<option value="<">Left</option>
													<option value="\\^">Up-Left</option>
												</select>
											</div>
										))
									}
									<Button onClick={() => handleAddMovement(index)}> Add Movement </Button>
								</div>

							</div>
						))
					}
					<Button onClick={handleAddMove}> Add Move </Button>
				</div>
			</div>
		</div >
	</>
}

export default PiecePage
