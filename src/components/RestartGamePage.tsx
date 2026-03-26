import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
import { useStore } from "@/utils/storage";

const RestartGamePage = () => {
	const navigate = useNavigate();
	const savedInstance = useStore((state) => state.instance);

	if (!savedInstance) {
		return <main className="p-4 flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Current Games</h2>
			<p>No saved game in progress.</p>
			<Button onClick={() => { void navigate("/start"); }}>
				Start A Game
			</Button>
		</main>
	}

	return <main className="p-4 flex flex-col gap-4">
		<h2 className="text-lg font-semibold">Current Games</h2>
		<p>Saved game found.</p>
		<Button onClick={() => { void navigate("/play"); }}>
			Resume Game
		</Button>
		<Button variant="outline" onClick={() => { void navigate("/start"); }}>
			Start New Game
		</Button>
	</main>
}

export default RestartGamePage
