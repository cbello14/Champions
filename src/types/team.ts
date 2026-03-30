import type { coordinate } from "@/features/boards/board"
import { moveDirection } from "./move"

export type turn = number
export type team = number
export type teamDirection = (coordinate: coordinate) => coordinate


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
