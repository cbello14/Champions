import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { X } from "lucide-react"
const BoardPage = () => {

	return <>
		<main className="flex grow-5 items-center justify-center">
			<div className="flex flex-col center">
				<Card className="m-5">
					<CardHeader className="flex flex-row items-center">
						<Input type="number" placeholder="8" defaultValue={8} min={1} />
						<X />
						<Input type="number" placeholder="8" defaultValue={8} min={1} />
					</CardHeader>
				</Card>
				<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
				<Button className="m-5" type="submit"> Save </Button>
			</div>
		</main>
	</>
}

export default BoardPage
