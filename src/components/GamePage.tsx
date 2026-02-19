import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useState } from "react"
import { Button } from "@/components/ui/button"
const GamePage = () => {

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);
	const [boardsOpen, setBoardsOpen] = useState<boolean>(true);

	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<Popover open={boardsOpen}>
				<PopoverTrigger asChild>
					<Button
						onClick={() => { setBoardsOpen(!boardsOpen) }}
						variant="ghost"
						size="icon"
						className="data-[state=open]:bg-accent h-7 w-7 grow-1"
					>
						Boards
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="overflow-hidden rounded-lg p-5 grow-1"
					align="start"
				>
					<div >
						<h2 >Boards would go here</h2>
					</div>
				</PopoverContent>
			</Popover>

			<main className="flex grow-5 items-center justify-center">
				<div className="center">
					<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
				</div>
			</main>

			<Popover open={piecesOpen}>
				<PopoverTrigger asChild>
					<Button
						onClick={() => { setPiecesOpen(!piecesOpen) }}
						variant="ghost"
						size="icon"
						className="data-[state=open]:bg-accent h-7 w-7 grow-1"
					>
						Pieces
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="overflow-hidden rounded-lg p-5 grow-1"
					align="end"
				>
					<div >
						<h2 >Pieces would go here</h2>
					</div>
				</PopoverContent>
			</Popover>

		</div >
	</>
}

export default GamePage
