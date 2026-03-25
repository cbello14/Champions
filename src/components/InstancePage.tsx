import { useMemo, useState } from "react"
import { basicGame } from "@/features/games/defaultGames"
import RectBoardInstance from "./RectBoard/RectBoardInstance"
import { Card, CardHeader } from "./ui/card"

const InstancePage = () => {
	const instance = useMemo(() => basicGame.createInstance(), []);

	const [currentTeam, setCurrentTeam] = useState<number>(1);
	const nextTeam = () => {
		if (currentTeam === 0) {
			setCurrentTeam(1)
		} else {
			setCurrentTeam(0)
		}
	}

	return <>
		<div className="flex flex-row justify-between h-full gap-4 p-4">
			<main className="flex grow-5 items-center justify-center">
				<div className="flex flex-col center">
					<Card className="m-5">
						<CardHeader className="flex flex-row items-center">
							<h3>{currentTeam === 0 ? "Black" : "White"} Teams Turn</h3>
						</CardHeader>
					</Card>
					<RectBoardInstance cellWidth={100} instance={instance} currentTeam={currentTeam} nextTeam={nextTeam} />
				</div>
			</main>
		</div >
	</>
}

export default InstancePage

