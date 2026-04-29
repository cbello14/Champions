import { useEffect, useRef } from 'react';

import type { Coordinate, Shape } from '@/features/boards/board';
import type { BoardDrawingFunction, BoardDrawingParams } from '@/types/boardDrawing';

const reverseCoordsHex = (internalX: number, internalY: number, cellWidth: number) => {
  // All this logic is from: https://www.redblobgames.com/grids/hexagons/
  const radius = cellWidth / 2;

  const x = internalX - radius;
  const y = internalY - radius;

  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * y) / radius;
  const r = ((2 / 3) * y) / radius;

  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);

  const qDiff = Math.abs(rq - q);
  const rDiff = Math.abs(rr - r);
  const sDiff = Math.abs(rs - s);

  if (qDiff > rDiff && qDiff > sDiff) {
    rq = -rr - rs;
  } else if (rDiff > sDiff) {
    rr = -rq - rs;
  }

  const selectedY = rr;
  // eslint-disable-next-line no-bitwise
  const selectedX = rq + (rr - (rr & 1)) / 2;
  return [selectedX, selectedY];
};

const reverseCoordsRect = (internalX: number, internalY: number, cellWidth: number) => {
  const selectedX = Math.trunc(internalX / cellWidth);
  const selectedY = Math.trunc(internalY / cellWidth);
  return [selectedX, selectedY];
};

const BoardGeneric = ({
  dimensions,
  cellWidth,
  drawingFunction,
  selected,
  setSelected,
  shape,
}: {
  dimensions: readonly number[];
  cellWidth: number;
  drawingFunction: BoardDrawingFunction;
  selected: Coordinate | null;
  setSelected: (newSelected: Coordinate | null) => void;
  shape: Shape;
}) => {
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

    const [selectedX, selectedY] =
      shape === 'rect'
        ? reverseCoordsRect(internalX, internalY, cellWidth)
        : reverseCoordsHex(internalX, internalY, cellWidth);

    if (
      selectedX >= 0 &&
      selectedX < dimensions[0] &&
      selectedY >= 0 &&
      selectedY < dimensions[1]
    ) {
      setSelected([selectedX, selectedY]);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const canvas = canvasRef.current;

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const params: BoardDrawingParams = {
          boardSize: [...dimensions],
          cellWidth,
          ctx: context,
          shape,
        };
        drawingFunction(params);
      }
    }
  }, [dimensions, cellWidth, selected, drawingFunction, shape]);
  return (
    <canvas
      ref={canvasRef}
      height={dimensions[1] * cellWidth}
      onClick={handleCanvasClick}
      width={dimensions[0] * cellWidth}
    />
  );
};

export default BoardGeneric;
