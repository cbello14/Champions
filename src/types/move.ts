type movementType = '~' | '$';
type movementTypeVerbose = 'jump' | 'slide';

type reflect = 'h' | 'v' | 'hv' | undefined
type reflectVerbose = 'horizontal' | 'vertical' | 'horizontal-vertical' | undefined

interface moveAttributes { type: movementType, reflection?: reflect, initialMove?: boolean, capturing?: boolean }
interface moveAttributesVerbose { type: movementTypeVerbose, reflection?: reflectVerbose, initialMove?: boolean, capturing?: boolean }

type cardinalDirection = '>' | '<' | 'v' | '^'
type cardinalDirectionVerbose = 'right' | 'left' | 'down' | 'up'

type diagonalDirection = '/v' | '/^' | '\v' | '\\^'
type diagonalDirectionVerbose = 'down-left' | 'up-right' | 'down-right' | 'up-left'

type direction = cardinalDirection | diagonalDirection
type directionVerbose = cardinalDirectionVerbose | diagonalDirectionVerbose

// NOTE: UNFORTUNATELY THERE IS NO WAY TO REQUIRE THE TYPE ONLY ACCEPT NUMBERS > 0 SO WE NEED TO BUILD IN THIS ASSERTION OURSELVES WHEREVER IT IS USED
type distance = number | 'n'

interface movement { distance: distance, direction: direction }
interface movementVerbose { distance: distance, direction: directionVerbose }

interface move { attributes: moveAttributes, movements: movement[] }
interface moveVerbose { attributes: moveAttributesVerbose, movements: movementVerbose[] }

export type { movementType, movementTypeVerbose, reflect, reflectVerbose, moveAttributes, moveAttributesVerbose, cardinalDirection, cardinalDirectionVerbose, diagonalDirection, diagonalDirectionVerbose, direction, directionVerbose, distance, movement, movementVerbose, move, moveVerbose }

/*
POssible some class version


export class Move {
    direction: string;
    condition: boolean;
    static genericConstruct(){
        return new Move("$o|1^",true);
    }
    constructor(directions: string,conditions: boolean){
        this.direction=directions
        this.condition=conditions
    }    
};
*/
