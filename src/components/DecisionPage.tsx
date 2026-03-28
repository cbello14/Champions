import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
import { useStore } from "@/utils/storage";
import { basicGame } from "@/features/games/defaultGames";
import { useEffect } from "react";
import type { Game } from "@/features/games/game";

const DecisionPage = () => {
	const navigate = useNavigate();
	const gamesJSON = useStore((state) => state.games);
	const setGame = useStore((state) => state.setGame);
	const getGames = useStore((state) => state.getGames);
	const setInstance = useStore((state) => state.setInstance);

	useEffect(() => {
		if (Object.keys(gamesJSON).length === 0) {
			setGame(basicGame);
		}
	}, [gamesJSON, setGame]);

	const games = getGames();

	const onStartGame = (game: Game) => {
		const instance = game.createInstance()
		setInstance(instance)
		void navigate(`/play/${instance.id}`);
	};

	return <main className="p-4 flex flex-col gap-4">
		<h2 className="text-lg font-semibold">Choose Game</h2>
		{games.length === 0 ? <p>No games found. Create one first.</p> :
			games.map((game) => (
				<Button key={game.id} onClick={() => { onStartGame(game); }}>
					Start {game.name}
				</Button>
			))
		}
		<Button variant="outline" onClick={() => { void navigate("/games"); }}>
			Create Custom Game
		</Button>
	</main>
}

export default DecisionPage
