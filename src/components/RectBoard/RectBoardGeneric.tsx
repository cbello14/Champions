import { useEffect, useRef } from "react"
import type { RectBoardDrawingFunction, RectBoardDrawingParams } from "@/types/boardDrawing"
import type { coordinate } from "@/types/board";


const RectBoardGeneric =
	({ dimensions, cellWidth, drawingFunction, selected, setSelected }:
		{ dimensions: number[]; cellWidth: number; drawingFunction: RectBoardDrawingFunction, selected: coordinate | null, setSelected: (newSelected: coordinate | null) => void }) => {
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top
			const selectedX = Math.trunc(x / cellWidth)
			const selectedY = Math.trunc(y / cellWidth)
			setSelected([selectedX, selectedY]);
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
