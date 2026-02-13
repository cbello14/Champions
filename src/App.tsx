import { Outlet, NavLink } from "react-router";
import './index.css'
function App() {

	return (
		<>
			<div className="h-screen w-full bg-background text-foreground">
				<header className="flex justify-between gap-4 p-4">
					<p>Champions</p>
					<NavLink to="/" end>
						Home
					</NavLink>
				</header>
				<Outlet />
			</div>
		</>
	)
}

export default App
