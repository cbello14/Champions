import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "./ui/select"
import SideBar from "@/components/SideBar.tsx";
import RectBoardPiece from "./RectBoard/RectBoardPiece";
import { Piece } from "@/features/pieces/piece";
import { calculateMovesRect } from "@/types/moveCalculation";
import type { coordinate } from "@/features/boards/board";
import { useStore } from "@/utils/storage";
import { moveDirection, moveMovementType, moveReflect, type direction, type distance, type movementType, type reflect } from "@/types/move";
import { Checkbox } from "./ui/checkbox";

const PiecePage = () => {
	const [piece, setPiece] = useState<Piece>(new Piece());
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
		deletePiece(piece.name);
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
	const handleDeleteMove = (index: number) => {		
		setPiece(piece.removeMoveAt(index))		
	};

	const handleAddMovement = (ind: number) => {
		const newMoves = [...piece.moves];
		newMoves[ind].movements.push({
			distance: 1,
			direction: moveDirection.up
		});
		setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
		
	};
	const handleDeleteMovement = (moveInd: number, movementInd: number) => {
		const newMovements = piece.moves[moveInd].movements.filter((_, i) => i != movementInd);
		const newMoves = [...piece.moves];
		newMoves[moveInd] = {
			...newMoves[moveInd],
			movements: newMovements
		};
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
							onClick={() => { setPiece(new Piece()) }}
						>
							Add Piece
						</Button>
						{
							Object.values(pieces).map((p) => (
								<Button
									key={p.id}
									className="m-1"
									onClick={() => { setPiece(p) }}
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
					<Button className="m-5" onClick={handleDelete}> Delete </Button>
				</div>
			</main>
			<div className="flex grow-2 items-center justify-center">
				<div className="flex flex-col center">
					<div>
						<label className="pr-4">Name:</label>
						<Input
							placeholder="Default Name"
							type="text"
							value={piece.name}
							onChange={(e) => {
								setPiece(new Piece(e.target.value, piece.image, piece.moves, piece.captures));
							}}
						/>
					</div>


					<img src={piece.image} />
					{
						piece.moves.map((move, index) => (
							<div key={index} className="border p-2 m-2">

								<div className="flex flex-row" >
									<label>Type:</label>
									<Select onValueChange={(e) => {
										const newMoves = [...piece.moves];
										newMoves[index] = {
											...move,
											attributes: {
												...move.attributes,
												type: e as movementType
											}

										};
										console.log(e);
										setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
									}}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent >
											<SelectGroup>
												<SelectItem value="$">Slide</SelectItem>
												<SelectItem value="~">Jump</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div className="flex flex-row">
									<label>Reflection:</label>
									<Select onValueChange={(e) => {
										const newMoves = [...piece.moves];
										newMoves[index] = {
											...move,
											attributes: {
												...move.attributes,
												reflection: e as reflect
											}
										};
										setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
									}}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent >
											<SelectGroup>
												<SelectItem value="none">None</SelectItem>
												<SelectItem value="h">Horizontal</SelectItem>
												<SelectItem value="v">Vertical</SelectItem>
												<SelectItem value="hv">Horizontal-Vertical </SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div>
									<label>Initial Move:</label>

									<Checkbox
										defaultChecked={move.attributes.initialMove}
										onCheckedChange={(e) => {
											const newMoves = [...piece.moves];
											console.log(e)
											var initial = true;
											if (typeof e === "boolean") {
												initial = e
											}
											else {
												initial = false
											}//if its bad, assume not a first move
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													initialMove: initial
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
											console.log
										}} />
								</div>

								<div>
									<label>Capturing:</label>
									<Checkbox

										defaultChecked={move.attributes.capturing}
										onCheckedChange={(e) => {
											const newMoves = [...piece.moves];
											console.log(e)
											var cap = true;
											if (typeof e === "boolean") {
												cap = e
											}
											else {
												cap = true
											}//if its bad, assume it is a capturing move
											newMoves[index] = {
												...move,
												attributes: {
													...move.attributes,
													capturing: cap
												}
											};
											setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
										}} />
								</div>

								<div className="flex flex-col center">
									Movements:
									{
										move.movements.map((movement, movementIndex) => (
											<div>
												<div className="flex flex-row"><label>Distance:</label>
													<Input
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
												</div>												
												<div className="flex flex-row">
													<label>Direction:</label>
													<Select onValueChange={(e) => {
														const newMoves = [...piece.moves];
														newMoves[index].movements[movementIndex] = {
															...newMoves[index].movements[movementIndex],
															direction: e as direction
														};
														console.log(e)
														setPiece(new Piece(piece.name, piece.image, newMoves, piece.captures));
													}}>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent >
															<SelectGroup>
																<SelectItem value="^">Up</SelectItem>
																<SelectItem value="/^">Up-Right</SelectItem>
																<SelectItem value=">">Right</SelectItem>
																<SelectItem value="\>">Down-Right</SelectItem>
																<SelectItem value="v">Down</SelectItem>
																<SelectItem value="/v">Down-Left</SelectItem>
																<SelectItem value="<">Left</SelectItem>
																<SelectItem value="\\^">Up-Left</SelectItem>
															</SelectGroup>
														</SelectContent>
													</Select>
												</div>
												<Button onClick={() => { handleDeleteMovement(index, movementIndex) }}> Delete Movement </Button>
												<br />
											</div>
										))
									}
									<Button onClick={() => { handleAddMovement(index) }}> Add Movement </Button>
								</div>

								<Button onClick={() => { handleDeleteMove(index) }}> Delete Move </Button>

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
