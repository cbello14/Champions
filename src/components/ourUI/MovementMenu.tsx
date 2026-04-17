import { Piece } from "@/features/pieces/piece";
import type { direction, movement } from "@/types/move";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { Label } from "../ui/label";

const MovementMenu = ({ movement, piece, index, movementIndex, setPiece, handleDeleteMovement }:
	{
		movement: movement, piece: Piece, index: number, movementIndex: number, setPiece: (piece: Piece) => void,
		handleDeleteMovement: (index: number, movementIndex: number) => void
	}) => {


	return (
		<div className="border p-2 m-2 flex flex-col gap-4">
			<div className="flex flex-row items-center gap-4">
				<Label>Distance:</Label>
				<Input
					type="number"
					value={movement.distance === Infinity ? '' : movement.distance}
					disabled={movement.distance === Infinity}
					onChange={(e) => {
						const newMovement = {
							...piece.moves[index].movements[movementIndex],
							distance: Number(e.target.value)
						};
						setPiece(piece.replaceMovementAt(index, movementIndex, newMovement))
					}}
				/>
				<Label>Infinite</Label>
				<Checkbox
					checked={movement.distance === Infinity}
					onCheckedChange={(checked) => {
						const newMovement = {
							...piece.moves[index].movements[movementIndex],
							distance: checked ? Infinity : 1
						};
						setPiece(piece.replaceMovementAt(index, movementIndex, newMovement))
					}}
				/>
			</div>
			<div className="flex flex-row items-center gap-4">
				<Label>Direction:</Label>
				<Select
					value={piece.moves[index].movements[movementIndex].direction}
					onValueChange={(e) => {

						const newMovement = {
							...piece.moves[index].movements[movementIndex],
							direction: e as direction
						};
						setPiece(piece.replaceMovementAt(index, movementIndex, newMovement));
					}}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent >
						<SelectGroup>
							<SelectItem value="up">Up</SelectItem>
							<SelectItem value="up-right">Up-Right</SelectItem>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="down-right">Down-Right</SelectItem>
							<SelectItem value="down">Down</SelectItem>
							<SelectItem value="down-left">Down-Left</SelectItem>
							<SelectItem value="left">Left</SelectItem>
							<SelectItem value="up-left">Up-Left</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Button onClick={() => { handleDeleteMovement(index, movementIndex) }}> Delete Movement </Button>
		</div>


	)
}

export default MovementMenu
