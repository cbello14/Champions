import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";

const RestartGamePage = () => {
	const navigate = useNavigate();

	return <> Choosing a board, have a list
		<Button onClick={() => { void navigate("/games"); }}> Start that game </Button> </>
}

export default RestartGamePage
