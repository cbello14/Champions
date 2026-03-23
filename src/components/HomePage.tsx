import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
const HomePage = () => {
	const navigate = useNavigate();
	return <>
		<div className="content-center">
			<div className="flex flex-row justify-evenly gap-x-10 m-10">
				<div className="flex grow flex-col justify-evenly gap-y-10">
					<Button className="flex-auto" onClick={() => { void navigate("start"); }}> Start A Game </Button>
					<div className="flex flex-row flex-grow gap-x-10 ">
						<Button className="flex-1 h-full" onClick={() => { void navigate("games"); }}> Create Custom Game</Button>
						<Button className="flex-1 h-full" onClick={() => { void navigate("pieces"); }}> Create Custom Piece</Button>
						<Button className="flex-1 h-full" onClick={() => { void navigate("boards"); }}> Create Custom Board</Button>
					</div>
					<Button className="flex-auto" onClick={() => { void navigate("start"); }}> Resume A Game </Button>
				</div>
				<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
			</div>
		</div>
	</>
}
export default HomePage
