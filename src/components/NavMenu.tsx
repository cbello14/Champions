import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BoardsTab from "@/components/BoardsTab"
import PiecesTab from "@/components/PiecesTab"
import GameTab from "@/components/GameTab"
import {Piece, Capture, Move,toParsableDirection} from "@/features/pieces/Piece"
const NavMenu = () => {


	return <>
		<Tabs defaultValue="GameTab" className="flex h-full justify-center">
			<div className="flex">
				<TabsList>
					<TabsTrigger value="GameTab">Game</TabsTrigger>
					<TabsTrigger value="PiecesTab">My Pieces</TabsTrigger>
					<TabsTrigger value="BoardsTab">My Boards</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="GameTab" >
				<GameTab />
			</TabsContent>

			<TabsContent value="PiecesTab" >
				<PiecesTab />
			</TabsContent>

			<TabsContent value="BoardsTab" >
				<BoardsTab />
			</TabsContent>

		</Tabs>
	</>
}

export default NavMenu;

