import type { Capture } from '@/types/capture';
import type { Direction, Move, MoveAttributes, Movement } from '@/types/move';

export interface VerifiedImage {
  src: string;
  verified: boolean;
}

interface MovementJSON {
  distance: number | 'Infinity';
  direction: Direction;
}
interface MoveJSON {
  attributes: MoveAttributes;
  movements: MovementJSON[];
}

const movementToJSON = (movement: Movement) => ({
  direction: movement.direction,
  distance: movement.distance === Infinity ? 'Infinity' : movement.distance,
});
const moveToJSON = (move: Move) => ({
  attributes: move.attributes,
  movements: move.movements.map((movement) => movementToJSON(movement)),
});

const movementFromJSON = (movementJSON: MovementJSON) => ({
  direction: movementJSON.direction,
  distance: movementJSON.distance === 'Infinity' ? Infinity : movementJSON.distance,
});

const moveFromJSON = (moveJSON: MoveJSON) => ({
  attributes: moveJSON.attributes,
  movements: moveJSON.movements.map((mJSON) => movementFromJSON(mJSON)),
});

export interface PieceJSON {
  id: string;
  name: string;
  image: VerifiedImage;
  moves: MoveJSON[];
  captures: Capture[];
}

export class Piece {
  readonly id: string;

  readonly name: string;

  readonly image: VerifiedImage;

  readonly moves: readonly Move[];

  readonly captures: readonly Capture[];

  constructor(
    name = '',
    image: VerifiedImage = { src: '', verified: false },
    m: Move[] = [],
    c: Capture[] = [],
    id?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.image = image;
    this.moves = m;
    this.captures = c;
  }

  addMove(move: Move, capture: Capture = 'direct'): Piece {
    return new Piece(
      this.name,
      this.image,
      [...this.moves, move],
      [...this.captures, capture],
      this.id
    );
  }

  removeMoveAt(index: number): Piece {
    const newMoves = [...this.moves];
    newMoves.splice(index, 1);
    const newCaptures = [...this.captures];
    newCaptures.splice(index, 1);
    return new Piece(this.name, this.image, newMoves, newCaptures, this.id);
  }

  removeMove(move: Move): Piece {
    const index = this.moves.indexOf(move);
    return this.removeMoveAt(index);
  }

  replaceMoveAt(move: Move, index: number): Piece {
    const newMoves = [...this.moves];
    newMoves[index] = move;
    return new Piece(this.name, this.image, newMoves, [...this.captures], this.id);
  }

  addMovement(moveIndex: number, movement: Movement): Piece {
    const newMoves = [...this.moves];
    newMoves[moveIndex].movements.push(movement);
    return new Piece(this.name, this.image, newMoves, [...this.captures], this.id);
  }

  removeMovementAt(moveIndex: number, movementIndex: number): Piece {
    const newMoves = [...this.moves];
    newMoves[moveIndex].movements.splice(movementIndex, 1);
    return new Piece(this.name, this.image, newMoves, [...this.captures], this.id);
  }

  replaceMovementAt(moveIndex: number, movementIndex: number, movement: Movement) {
    const newMoves = [...this.moves];
    newMoves[moveIndex].movements[movementIndex] = movement;
    return new Piece(this.name, this.image, newMoves, [...this.captures], this.id);
  }

  replaceCaptureAt(capture: Capture, index: number) {
    const newCaptures = [...this.captures];
    newCaptures[index] = capture;
    return new Piece(this.name, this.image, [...this.moves], newCaptures, this.id);
  }

  replaceImage(image: VerifiedImage) {
    return new Piece(this.name, image, [...this.moves], [...this.captures], this.id);
  }

  toJSON(): PieceJSON {
    const newMoves = [...this.moves].map((move) => moveToJSON(move) as MoveJSON);
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      moves: newMoves,
      captures: [...this.captures],
    };
  }

  static fromJSON(data: PieceJSON): Piece {
    const name = data.name ? data.name : '';
    const image = data.image ? data.image : { src: '', verified: false };
    const moves = data.moves ? data.moves.map((moveJSON) => moveFromJSON(moveJSON)) : [];
    const captures = data.captures ? data.captures : [];
    const id = data.id ? data.id : '';
    return new Piece(name, image, moves, captures, id);
  }
}
