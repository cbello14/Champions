import { movement, movementVerbose } from "./move"

type capture = 'x' | '' | movement[]
type captureVerbose = 'direct' | 'no-capture' | movementVerbose[]

export type { capture, captureVerbose }
