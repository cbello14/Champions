import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import RectBoardBasic from "@/components/RectBoard/RectBoardBasic"
import { X } from "lucide-react"
import { useState } from "react"
const BoardPage = () => {
	const [dimensions, setDimensions] = useState<number[]>([8, 8]);
	return <>
		<main className="flex grow-5 items-center justify-center">
			<div className="flex flex-col center">
				<Card className="m-5">
					<CardHeader className="flex flex-row items-center">
						<Input type="number" placeholder="8" defaultValue={dimensions[0]} min={1} onChange={(e) => { setDimensions([parseInt(e.target.value), dimensions[1]]) }} />
						<X />
						<Input type="number" placeholder="8" defaultValue={dimensions[1]} min={1} onChange={(e) => { setDimensions([dimensions[0], parseInt(e.target.value)]) }} />
					</CardHeader>
				</Card>
				<RectBoardBasic dimensions={dimensions} cellWidth={100} outlineColor={"#FFF321"} />
				<Button className="m-5" type="submit"> Save </Button>
			</div>
		</main>
	</>
}

export default BoardPage
