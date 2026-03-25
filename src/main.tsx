import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import PiecePage from "@/components/PiecePage.tsx";
import GamePage from "@/components/GamePage.tsx";
import BoardPage from "@/components/BoardPage.tsx";
import DecisionPage from "@/components/DecisionPage.tsx";
import App from './App.tsx'
import HomePage from './components/HomePage.tsx';
import InstancePage from './components/InstancePage.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} >
					<Route index element={<HomePage />} />
					<Route path="pieces" element={<PiecePage />} />
					<Route path="games" element={<GamePage />} />
					<Route path="boards" element={<BoardPage />} />
					<Route path="start" element={<InstancePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
