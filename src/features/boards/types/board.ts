type shape = 'rect' | 'tri' | 'hex'
type dimension = number[]
type coordinate = number[]

type board = {
	name: string,
	shape: shape,
	dimension: dimension,
	blocked: coordinate[]
}

export type { shape, dimension, coordinate, board }
