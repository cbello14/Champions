import { Outlet, NavLink } from "react-router";
import './index.css'
import { Toaster } from "./components/ui/sonner";
function App() {

	return (
		<>
			<div className="h-screen w-full bg-background text-foreground">
				<Toaster/>
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
