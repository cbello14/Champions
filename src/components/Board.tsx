import { useEffect, useRef, useState } from "react"

const Board = ({ dimensions, cellWidth }: { dimensions: number[]; cellWidth: number }) => {
	const [selected, setSelected] = useState<number[] | null>(null);
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
		// put this inside a seperate file at some point
		if (canvasRef.current) {
			const context = canvasRef.current.getContext("2d");

			if (context) {
				for (let x = 0; x < dimensions[0]; x++) {
					for (let y = 0; y < dimensions[1]; y++) {
						const cellX = x * cellWidth;
						const cellY = y * cellWidth;
						context.fillStyle = (x + y) % 2 === 0 ? "white" : "black"
						if (selected && selected[0] === x && selected[1] === y) context.fillStyle = "blue"
						context.fillRect(cellX, cellY, cellWidth, cellWidth)
						context.strokeText(x + " x " + y, cellX, cellY+cellWidth);
					}
				}
			}
		}
	}, [dimensions, cellWidth, selected])
	return <>
		<canvas ref={canvasRef} onClick={handleCanvasClick} width={dimensions[0] * cellWidth} height={dimensions[1] * cellWidth} />
	</>
}

export default Board
