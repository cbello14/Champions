import type { coordinate } from "@/features/boards/board"
import { moveDirection } from "@/types/move"
import type { direction } from "@/types/move"

export type turn = number
export type teamDirection = (coordinate: coordinate) => coordinate
export interface team {
	teamId: number,
	color: string,
	direction: direction
}


export const rectTeamDirection: Record<string, teamDirection> = {
	[moveDirection.up]: ([x, y]) => [x, y],
	[moveDirection.down]: ([x, y]) => [-x, -y],
	[moveDirection.right]: ([x, y]) => [-y, x],
	[moveDirection.left]: ([x, y]) => [y, -x],
	[moveDirection.upright]: ([x, y]) => { return [x - y, x + y]; },
	[moveDirection.downright]: ([x, y]) => { return [-y - x, x - y]; },
	[moveDirection.downleft]: ([x, y]) => { return [y - x, -x - y]; },
	[moveDirection.upleft]: ([x, y]) => { return [y + x, y - x]; }
}