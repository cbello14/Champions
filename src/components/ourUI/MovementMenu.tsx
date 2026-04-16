import { Piece } from "@/features/pieces/piece";
import type { distance, direction, movement } from "@/types/move";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";

const MovementMenu = ({ movement, piece, index, movementIndex, setPiece, handleDeleteMovement }:
    {
        movement: movement, piece: Piece, index: number, movementIndex: number, setPiece: (piece: Piece) => void,
        handleDeleteMovement: (index: number, movementIndex: number) => void
    }) => {


    return (
        <>
            <div className="flex flex-row"><label>Distance:</label>
                <Input
                    type="text"
                    value={movement.distance}
                    onChange={(e) => {                        
                        const newMovement= {
                            ...piece.moves[index].movements[movementIndex],
                            distance: e.target.value as distance
                        };

                        
                        setPiece(piece.replaceMovementAt(index,movementIndex,newMovement))
                    }}
                />
            </div>
            <div className="flex flex-row">
                <label>Direction:</label>
                <Select 
                value={piece.moves[index].movements[movementIndex].direction}
                onValueChange={(e) => {
                    
                    const newMovement={
                        ...piece.moves[index].movements[movementIndex],
                        direction: e as direction
                    };
                    setPiece(piece.replaceMovementAt(index,movementIndex,newMovement));
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
            <br />
            <br />
        </>


    )
}

export default MovementMenu
