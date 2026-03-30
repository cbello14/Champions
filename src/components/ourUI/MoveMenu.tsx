import { Piece } from "@/features/pieces/piece";
import type { move, movementType, reflect } from "@/types/move";

import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import MovementMenu from "./MovementMenu";

const MoveMenu = ({ index, piece, move, setPiece, handleDeleteMovement, handleAddMovement, handleDeleteMove }:
    {
        index: number, piece: Piece, move: move, setPiece: (piece: Piece) => void,
        handleDeleteMovement: (index: number, movementIndex: number) => void,
        handleAddMovement: (index: number) => void,
        handleDeleteMove: (index: number) => void
    }) => {

    return (
        <div key={index} className="border p-2 m-2">

            <div className="flex flex-row" >
                <label>Type:</label>
                <Select
                    value={move.attributes.type}
                    onValueChange={(e) => {
                        const newMoves = [...piece.moves];
                        newMoves[index] = {
                            ...move,
                            attributes: {
                                ...move.attributes,
                                type: e as movementType
                            }

                        };
                        console.log(e);
                        setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
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
                <Select                    
                    value={(move.attributes.reflection === undefined) ? "none" : move.attributes.reflection}
                    onValueChange={(e) => {
                        const newMoves = [...piece.moves];
                        newMoves[index] = {
                            ...move,
                            attributes: {
                                ...move.attributes,
                                reflection: e as reflect
                            }
                        };
                        setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
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

            <div>
                <label>Initial Move Only:</label>

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
                        setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
                        console.log
                    }} />
            </div>

            <div>
                <label>Only On Capturing:</label>
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
                        setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
                    }} />
            </div>

            <div className="flex flex-col center">
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

        </div>
    )
}


export default MoveMenu