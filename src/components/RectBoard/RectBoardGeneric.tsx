import { useEffect, useRef } from "react"
import type { RectBoardDrawingFunction, RectBoardDrawingParams } from "@/types/boardDrawing"
import type { coordinate } from "@/features/boards/board";


const RectBoardGeneric =
	({ dimensions, cellWidth, drawingFunction, selected, setSelected }:
		{ dimensions: number[]; cellWidth: number; drawingFunction: RectBoardDrawingFunction, selected: coordinate | null, setSelected: (newSelected: coordinate | null) => void }) => {
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();

			const rawX = event.clientX - rect.left;
			const rawY = event.clientY - rect.top;

			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;

			const internalX = rawX * scaleX;
			const internalY = rawY * scaleY;

			const selectedX = Math.trunc(internalX / cellWidth);
			const selectedY = Math.trunc(internalY / cellWidth);

			if (selectedX >= 0 && selectedX < dimensions[0] &&
				selectedY >= 0 && selectedY < dimensions[1]) {
				setSelected([selectedX, selectedY]);
			}
		}

		useEffect(() => {
			if (canvasRef.current) {
				const context = canvasRef.current.getContext("2d");
				const canvas = canvasRef.current

				if (context) {
					context.clearRect(0, 0, canvas.width, canvas.height);
					const params: RectBoardDrawingParams = { boardSize: dimensions, cellWidth: cellWidth, ctx: context }
					drawingFunction(params)
				}
			}
		}, [dimensions, cellWidth, selected, drawingFunction])
		return <>
			<canvas ref={canvasRef} onClick={handleCanvasClick} width={dimensions[0] * cellWidth} height={dimensions[1] * cellWidth} />
		</>
	}

export default RectBoardGeneric
