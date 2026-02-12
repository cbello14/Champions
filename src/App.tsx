import { Outlet } from "react-router";
import './index.css'
function App() {

	return (
		<>
			<div className="h-screen w-full bg-background text-foreground">
				<Outlet />
			</div>
		</>
	)
}

export default App
