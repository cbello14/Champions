import BoardPage from "@/components/BoardPage"
import PiecePage from "@/components/PiecePage"
import GamePage from "@/components/GamePage"
import HomePage from "@/components/HomePage"
import { useState } from "react"
import type { Pages } from "@/types/pages.ts"
const NavMenu = () => {
	const [currentPage, setPage] = useState<Pages>("HomePage");
	const setPageProvider = (page: Pages) => { setPage(page) }
	return <>
		{currentPage === "PlayPage" && <div> Not implemented yet </div>}
		{currentPage === "GamePage" && <GamePage />}
		{currentPage === "PiecePage" && <PiecePage />}
		{currentPage === "BoardPage" && <BoardPage />}
		{currentPage === "HomePage" && <HomePage setPage={setPageProvider} />}
	</>

}

export default NavMenu;

