import { Button } from "@/components/ui/button";
import { useStore } from "@/utils/storage";
import { useEffect } from "react";
import { basic } from "@/features/boards/defaultBoards";
import type { Board } from "@/features/boards/board";

const BoardList = ({ onSelectBoard }: { onSelectBoard: (board: Board) => void }) => {
	const boardsJSON = useStore((state) => state.boards);
	const setBoard = useStore((state) => state.setBoard);
	const getBoards = useStore((state) => state.getBoards);

	useEffect(() => {
		const existingBoards = Object.keys(boardsJSON);
		if (existingBoards.length === 0) {
			setBoard(basic)
		}
	}, [boardsJSON, setBoard]);

	const boards = getBoards();
	return (
		<div className="flex flex-col gap-4">
			{boards.length > 0 ? (
				boards.map((board) => (
					<Button
						key={board.id}
						variant="outline"
						className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-accent"
						onClick={() => { onSelectBoard(board) }}
					>
						<span className="text-xs font-semibold truncate w-full">
							{board.name}
						</span>
						<span className="text-xs font-semibold truncate w-full">
							{board.dimensions}
						</span>
					</Button>
				))
			) : (
				<p className="col-span-full text-center text-muted-foreground py-4">
					No pieces saved in storage.
				</p>
			)}
		</div>
	);
};

export default BoardList;
