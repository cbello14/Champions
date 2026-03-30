import { Piece } from "@/features/pieces/piece";
import type { distance, direction, movement } from "@/types/move";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";

const MovementMenu = ({movement, piece,index, movementIndex, setPiece,handleDeleteMovement }:
    {movement: movement, piece:Piece, index:number, movementIndex:number, setPiece: (piece:Piece)=>void, handleDeleteMovement: (index:number, movementIndex:number)=>void}) => {


    return (
        <>
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
                        setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
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
                    setPiece(new Piece(piece.name, piece.image, newMoves, [...piece.captures]));
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
            <br />
        </>


    )
}

export default MovementMenu