import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
import { useStore } from "@/utils/storage";
import RectBoardSnapshot from "./RectBoard/RectBoardSnapshot";
import { Instance } from "@/features/instances/instance";

const RestartGamePage = () => {
	const navigate = useNavigate();
	const savedInstances = useStore((state) => state.instances);
	const instances = Object.values(savedInstances)

	if (!instances.length) {
		return <main className="p-4 flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Current Games</h2>
			<p>No saved games in progress.</p>
			<Button onClick={() => { void navigate("/start"); }}>
				Start A Game
			</Button>
		</main>
	}

	return <main className="p-4 flex flex-col gap-4">
		<h2 className="text-lg font-semibold">Current Games</h2>
		<p>Saved games found.</p>
		<div className="flex flex-row">
			{instances.map((instanceJSOn) => {
				const instance = Instance.fromJSON(instanceJSOn)

				return <div key={instance.id} className="p-4">
					<RectBoardSnapshot cellWidth={25} board={instance.board} pieces={instance.piecesRecord} />
					<Button onClick={() => { void navigate(`/play/${instance.id}`); }}>
						Resume Game
					</Button>
				</div>
			})}
		</div>
		<Button variant="outline" onClick={() => { void navigate("/start"); }}>
			Start New Game
		</Button>
	</main>
}

export default RestartGamePage
