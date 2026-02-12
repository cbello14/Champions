import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
const HomePage = () => {
	const navigate = useNavigate();
	return <>
		<Button onClick={() => { navigate("games"); }}> Create Custom Game</Button>
		<Button onClick={() => { navigate("pieces"); }}> Create Custom Piece</Button>
		<Button onClick={() => { navigate("boards"); }}> Create Custom Board</Button>
	</>


}
export default HomePage
