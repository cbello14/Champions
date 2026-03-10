import { useEffect, useRef, useState } from "react"
import type { RectBoardDrawingFunction, RectBoardDrawingParams } from "@/types/boardDrawing"


const RectBoardGeneric =
	({ dimensions, cellWidth, bottomLayer, middleLayer, topLayer }:
		{ dimensions: number[]; cellWidth: number; bottomLayer: RectBoardDrawingFunction; middleLayer: RectBoardDrawingFunction; topLayer: RectBoardDrawingFunction }) => {
		const [selected, setSelected] = useState<number[] | null>(null);
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
			console.log("Hello");
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
			// put this inside a seperate file at some point
			if (canvasRef.current) {
				const context = canvasRef.current.getContext("2d");

				if (context) {
					for (let x = 0; x < dimensions[0]; x++) {
						for (let y = 0; y < dimensions[1]; y++) {
							const isSelected = !!selected && selected[0] === x && selected[1] === y;
							const params: RectBoardDrawingParams = { gridX: x, gridY: y, cellWidth: cellWidth, ctx: context, selected: isSelected }
							bottomLayer(params);
							middleLayer(params);
							topLayer(params);
						}
					}
				}
			}
		}, [dimensions, cellWidth, selected, bottomLayer, middleLayer, topLayer])
		return <>
			<canvas ref={canvasRef} onClick={handleCanvasClick} width={dimensions[0] * cellWidth} height={dimensions[1] * cellWidth} />
		</>
	}

export default RectBoardGeneric
