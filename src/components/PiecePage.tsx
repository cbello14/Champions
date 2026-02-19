import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
const PiecePage = () => {

	const [piecesOpen, setPiecesOpen] = useState<boolean>(true);

	return <>
		<div className="flex flex-row justify-between gap-4 p-4 items-start">
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
					align="start"
				>
					<div >
						<h2 >Pieces would go here</h2>
					</div>
				</PopoverContent>
			</Popover>
			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
					<Button className="m-5" type="submit"> Save </Button>
				</div>
			</main>
			<div className="flex grow-1 flex-none w-48">
				<img className="flex grow-1 object-scale-down" src="https://img.freepik.com/free-vector/chess_53876-25642.jpg?semt=ais_hybrid&w=740&q=80" />
			</div>
		</div >
	</>
}

export default PiecePage
