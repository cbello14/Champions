import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
const HomePage = () => {
	const navigate = useNavigate();
	return <>
		<div className="flex-row justify-between">
			<div className="flex-col">
				<Button onClick={() => { navigate("games"); }}> Create Custom Game</Button>
				<Button onClick={() => { navigate("pieces"); }}> Create Custom Piece</Button>
				<Button onClick={() => { navigate("boards"); }}> Create Custom Board</Button>
				<Button onClick={() => { navigate("start"); }}> Start A Game </Button>
			</div>
			<img src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg" />
		</div>
	</>


}
export default HomePage
