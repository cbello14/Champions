import { Button } from "@/components/ui/button";
import { Piece } from "@/features/pieces/piece";
import { useStore } from "@/utils/storage";
import { useEffect } from "react";
import { pawn, king, queen, rook, knight, bishop } from "@/features/pieces/defaultPieces";

const PieceList = ({ onSelectPiece }: { onSelectPiece: (piece: Piece) => void }) => {
	const piecesJSON = useStore((state) => state.pieces);
	const setPiece = useStore((state) => state.setPiece);
	const getPieces = useStore((state) => state.getPieces);

	useEffect(() => {
		const existingPieces = Object.keys(piecesJSON);
		if (existingPieces.length === 0) {
			const defaults = [pawn, king, queen, knight, rook, bishop];
			defaults.forEach((p) => {
				setPiece(p);
			});
		}
	}, [piecesJSON, setPiece]);

	const allPieces = getPieces();
	const pieceArray = Object.values(allPieces);
	return (
		<div className="flex flex-col gap-4">
			{pieceArray.length > 0 ? (
				pieceArray.map((piece) => (
					<Button
						key={piece.name}
						variant="outline"
						className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-accent"
						onClick={() => { onSelectPiece(piece) }}
					>
						<span className="text-xs font-semibold truncate w-full">
							{piece.name}
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

export default PieceList;
