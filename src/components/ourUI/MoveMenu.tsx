import { Piece } from "@/features/pieces/piece";
import type { move, movementType, reflect } from "@/types/move";

import { Button } from "../ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import MovementMenu from "./MovementMenu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const MoveMenu = ({ index, piece, move, setPiece, handleDeleteMovement, handleAddMovement, handleDeleteMove }:
	{
		index: number, piece: Piece, move: move, setPiece: (piece: Piece) => void,
		handleDeleteMovement: (index: number, movementIndex: number) => void,
		handleAddMovement: (index: number) => void,
		handleDeleteMove: (index: number) => void
	}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Collapsible className="border p-2 m-2">
			<div className="flex flex-row items-center justify-between">
				<Label>Move {index + 1}</Label>
				<CollapsibleTrigger >
					<Button variant="ghost" size="sm" onClick={() => { { setOpen(!open); } }}> {open ? <ChevronUp /> : <ChevronDown />}</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className="flex flex-col gap-4 pt-2">

				<div className="flex flex-row items-center gap-4" >
					<Label>Type:</Label>
					<Select
						value={move.attributes.type}
						onValueChange={(e) => {

							const newMove = {
								...move,
								attributes: {
									...move.attributes,
									type: e as movementType
								}
							}
							setPiece(piece.replaceMoveAt(newMove, index))


						}}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent >
							<SelectGroup>
								<SelectItem value="slide">Slide</SelectItem>
								<SelectItem value="jump">Jump</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-row items-center gap-4">
					<Label>Reflection:</Label>
					<Select
						value={move.attributes.reflection ?? "none"}
						onValueChange={(e) => {

							const newMove = {
								...move,
								attributes: {
									...move.attributes,
									reflection: e as reflect
								}
							}
							setPiece(piece.replaceMoveAt(newMove, index))

						}}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent >
							<SelectGroup>
								<SelectItem value="none">None</SelectItem>
								<SelectItem value="horizontal">Horizontal</SelectItem>
								<SelectItem value="verical">Vertical</SelectItem>
								<SelectItem value="horizontal-vertical">Horizontal-Vertical </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-row items-center gap-4">
					<Label>Initial Move Only:</Label>

					<Checkbox
						defaultChecked={move.attributes.initialMove}
						onCheckedChange={(e) => {

							let initial = true;
							if (typeof e === "boolean") {
								initial = e
							}
							else {
								initial = false
							}//if its bad, assume not a first move



							const newMove = {
								...move,
								attributes: {
									...move.attributes,
									initialMove: initial
								}
							};
							setPiece(piece.replaceMoveAt(newMove, index))
						}} />
				</div>

				<div className="flex flex-row items-center gap-4">
					<Label>Only On Capturing:</Label>
					<Checkbox

						defaultChecked={move.attributes.capturing}
						onCheckedChange={(e) => {
							let cap = true;
							if (typeof e === "boolean") {
								cap = e
							}
							else {
								cap = true
							}//if its bad, assume it is a capturing move

							const newMove = {
								...move,
								attributes: {
									...move.attributes,
									capturing: cap
								}
							};
							setPiece(piece.replaceMoveAt(newMove, index))


						}} />
				</div>

				<div className="flex flex-col center gap-4">
					Movements:
					{
						move.movements.map((movement, movementIndex) => (
							<div>
								<MovementMenu
									movement={movement}
									piece={piece}
									index={index}
									movementIndex={movementIndex}
									setPiece={setPiece}
									handleDeleteMovement={handleDeleteMovement} />
							</div>
						))
					}
					<Button onClick={() => { handleAddMovement(index) }}> Add Movement </Button>
				</div>

				<Button onClick={() => { handleDeleteMove(index) }}> Delete Move </Button>

			</CollapsibleContent>
		</Collapsible >
	)
}


export default MoveMenu
