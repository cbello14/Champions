import { useState } from "react"
import RectBoardInstance from "./RectBoard/RectBoardInstance"
import { Card, CardHeader } from "./ui/card"
import { useStore } from "@/utils/storage"
import { useParams } from "react-router"
import { Instance } from "@/features/instances/instance"

const InstancePage = () => {
	const { instanceId } = useParams<{ instanceId: string }>()
	const instanceJSON = useStore((state) => instanceId ? state.instances[instanceId] : null)
	const saveInstance = useStore((state) => state.setInstance);
	const [instance, setInstance] = useState<Instance | null>(instanceJSON ? Instance.fromJSON(instanceJSON) : null)
	const [currentTeam, setCurrentTeam] = useState<number>(1);

	const nextTeam = () => {
		if (!instance) return
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
					{instance ? <RectBoardInstance cellWidth={100} instance={instance} currentTeam={currentTeam} nextTeam={nextTeam} setInstance={(instance) => { setInstance(instance); }} /> : <div>Could not find game</div>}
				</div>
			</main>
		</div >
	</>
}

export default InstancePage
