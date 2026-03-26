import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import RectBoardBasic from "@/components/RectBoard/RectBoardBasic"
import { X } from "lucide-react"
import { useState } from "react"
import { Board } from "@/features/boards/board"
import { useStore } from "@/utils/storage"
const BoardPage = () => {
	const [dimensions, setDimensions] = useState<number[]>([8, 8]);
	const [name, setName] = useState<string>("")
	const saveBoard = useStore((state) => state.setBoard)
	return <>
		<main className="flex grow-5 items-center justify-center">
			<div className="flex flex-col center">
				<Card className="m-5">
					<CardHeader className="flex flex-row items-center">
						<div className="flex flex-col">
							<Input type="text" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
							<div className="flex flex-row">
								<Input type="number" placeholder="8" defaultValue={dimensions[0]} min={1} onChange={(e) => { setDimensions([parseInt(e.target.value), dimensions[1]]) }} />
								<X />
								<Input type="number" placeholder="8" defaultValue={dimensions[1]} min={1} onChange={(e) => { setDimensions([dimensions[0], parseInt(e.target.value)]) }} />
							</div>
						</div>
					</CardHeader>
				</Card>
				<RectBoardBasic dimensions={dimensions} cellWidth={100} />
				<Button className="m-5" type="submit" onClick={() => { saveBoard(new Board(name ? name : undefined, undefined, dimensions)) }}> Save </Button>
			</div>
		</main>
	</>
}

export default BoardPage
