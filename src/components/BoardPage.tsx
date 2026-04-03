import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import RectBoardBasic from "@/components/RectBoard/RectBoardBasic"
import { X } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/utils/storage"
import { Board } from "@/features/boards/board"
import { basic } from "@/features/boards/defaultBoards"

const BoardPage = () => {
	const [board, setBoard] = useState<Board>(basic);
	const [dimensions, setDimensions] = useState<number[]>([8, 8]);
	const [name, setName] = useState<string>("");
	const [action, setAction] = useState<"tile" | null>(null)
	const saveBoard = useStore((state) => state.setBoard);

	const onNameChange = (name: string) => {
		setName(name);
		const newBoard = new Board(name, board.shape, board.dimensions, board.specialTiles, board.id);
		setBoard(newBoard);
	};

	const onXChange = (x: number) => {
		setDimensions([x, dimensions[1]]);
		const newBoard = new Board(name, board.shape, dimensions, board.specialTiles, board.id);
		setBoard(newBoard);
	};

	const onYChange = (y: number) => {
		setDimensions([dimensions[0], y]);
		const newBoard = new Board(name, board.shape, dimensions, board.specialTiles, board.id);
		setBoard(newBoard);
	};

	return <>
		<main className="flex grow-5 items-center justify-center">
			<div className="flex flex-col center">
				<Card className="m-5">
					<CardHeader className="flex flex-row items-center">
						<div className="flex flex-col">
							<Input type="text" defaultValue={name} onChange={(e) => { onNameChange(e.target.value) }} />
							<div className="flex flex-row">
								<Input type="number" placeholder="8" defaultValue={dimensions[0]} min={1} onChange={(e) => { onXChange(parseInt(e.target.value)) }} />
								<X />
								<Input type="number" placeholder="8" defaultValue={dimensions[1]} min={1} onChange={(e) => { onYChange(parseInt(e.target.value)) }} />
							</div>
						</div>
					</CardHeader>
				</Card>
				<RectBoardBasic dimensions={dimensions} cellWidth={100} board={board} setBoard={(board: Board) => setBoard(board)} onClickAction={action} />
				<div className="flex flex-row justify-center">
					<Button className="m-5" onClick={() => { setAction("tile") }}> Block / Unblock Tile </Button>
					<Button className="m-5" onClick={() => { setAction(null) }}> Stop Editing </Button>
				</div>
				<Button className="m-5" type="submit" onClick={() => { saveBoard(board) }}> Save </Button>
			</div>
		</main>
	</>
}

export default BoardPage
