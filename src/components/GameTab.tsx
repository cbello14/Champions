import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
const GameTab = () => {
	
	return <>
		<div className="flex justify-between h-full gap-4 p-4">
			<Popover open={true}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="data-[state=open]:bg-accent h-7 w-7"
					>
						Boards
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-56 overflow-hidden rounded-lg p-0"
					align="start"
				>
					<div >
						<h2 >Boards would go here</h2>
					</div>
				</PopoverContent>
			</Popover>

			<main className="flex-1 flex items-center justify-center">
				<div className="game-board">
					<canvas id="board" width="600" height="600" style={{ border: "1px solid #FFFFFF" }}></canvas>
				</div>
				<script src="/src/components/TestBoardCanvas.js"></script>
			</main>

			<Popover open={true}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="data-[state=open]:bg-accent h-7 w-7"
					>
						Pieces
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-56 overflow-hidden rounded-lg p-0"
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

export default GameTab
