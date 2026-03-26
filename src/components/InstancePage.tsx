import { useEffect, useMemo, useState } from "react"
import { basicGame } from "@/features/games/defaultGames"
import RectBoardInstance from "./RectBoard/RectBoardInstance"
import { Card, CardHeader } from "./ui/card"
import { useStore } from "@/utils/storage"

const InstancePage = () => {
	const storedInstance = useStore((state) => state.instance);
	const getInstance = useStore((state) => state.getInstance);
	const saveInstance = useStore((state) => state.setInstance);
	const instance = useMemo(() => getInstance() ?? basicGame.createInstance(), [getInstance]);

	const [currentTeam, setCurrentTeam] = useState<number>(1);

	useEffect(() => {
		if (!storedInstance) {
			saveInstance(instance);
		}
	}, [storedInstance, saveInstance, instance]);

	const nextTeam = () => {
		setCurrentTeam((team) => team === 0 ? 1 : 0);
		saveInstance(instance);
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
