# Naming

- piece : A singular piece, when we have multiple we call it pieces
- board : A singular board, when we have multiple we call it boards
- game  : A singular custom game, when we have multiple we call it games (specifically a game that is not being played)
- instance : A singular custom game that has been started, (doesnt necessarily mean a move has been made) 

Some examples:
A component that lists every piece a player has created might be called <PiecesList>
When the player presses the Start Game button on the homepage, they choose a 'game' to create an 'instance' of

The naming for game and instance is open to change, this is just the best name I could think of

# Object Structure
All objects will be in JSON

## Piece 
```
{
    name: string,
    moves: string[],
    captures: string[]
}
```
### Movement Notation
Movement notation will be a variation of [Parlett's Movement Notation](https://en.wikipedia.org/wiki/Fairy_chess_piece#Parlett's_movement_notation)
All moves will be expressed in some number of '&|#?', where '|' is a seperator 

'#' denotes how far the move will go, eg: 1 moves 1 space, 2 moves 2 spaces. There is a special case of 'n' in which the number of spaces is 'infinite'

'?' denotes what direction the piece will move in, for now we will just keep symbols that move in a single direction, as all other moves can be constructed from them:
    - '>' right
    - '<' left
    - 'v' backwards
    - '^' forwards
    - '/^' up-right
    - '\\^' up-left
    - '/v' down-left
    - '\\v' down-right

'&' denotes how the piece moves whether by jumping like a knight '~' or sliding '$' like rook, it can also have 'h' and/or 'v' appended to it for horizontal and vertical reflection.
Sliding is blocked by empty spaces and other pieces, unless it can capture said other piece, in which case it will land there. This can also have a 'i' appended to show that this move can only be done if it is the piece's first move. Finally  'c', or 'o' can be appended last to indicate that this move can only be done if the piece will capture or the piece won't capture respectively

The order of this goes (\~/$) then (h,v) then (i) then (c/o). The only one of these requires is (\~/$)

Also note that we can combine '#-?' using more '|'

Some examples:
rook: `['%|n>', '%|n<', '%|nv', '%|n^']` or `['%hv|n>']` or `['%hv|n^']` and so on
knight: `['~hv|2^|1>', '~hv|2>|1^']`

### Capturing

Given some move at index i in the moves array, the corresponding capture rule is at index i in the captures array. Capture rules can be written either as 'x' to capture whatever piece is landed on (eg: how a queen or a knight moves) or with some number of '#?' as above to capture pieces in a different location (eg: en passant), or left blank '' to indicate the piece cannot capture.

If a move can be reflected, and has special capture rules (not 'x' or '') then the capture rules will be reflected when the move is

### A full example
```
{
    name: 'Pawn',
    moves: ['$o|1^', '$io|2^', '$hc|1/^', '$hc|1/^']
    captures: ['', '', 'x', '1>']
}
```
## Board 
```
{
    shape: 'rect' | 'tri' | 'hex' | ... (whatever else is managed to implement),
    dimensions: number[]  (has to match to each shape),
    blocked: number[][],
}
```
Each shape will have its own way of interpreting dimensions. For example a rectangular board will expect two numbers with the first being the width and the next being the height

The blocked spaces are spaces that no piece can land on or cross (unless jumping over). It will be a list of arrays in the same format as the dimensions. Each shape will have its own 'origin' from which all coordinates on the board will be increased numbers from (eg: a 'rect' with a dimension of [10,10] might interpret the origin as the bottom left grid square, and so including [0,1] in the blocked list will block any pieces from being on the grid square one above the origin.

## Game 
```
{
    board: Board,
    pieces: Record<number[], [Piece, number]>
}
```
Record is a dictionary, where the key will be a coordinate and the value will be a tuple containing the Piece at that location and a number corresponding to which player it belongs to.

## Instance 
```
{
    board: Board,
    pieces: Record<number[], [Piece, number]>,
    data: Record<Piece, Info>
}
```
Here data is a dictionary which takes a piece and stores some corresponding information about it (eg: if it has moved, which pieces it has captured, etc.). If a piece is captured it will be removed from 'pieces' but it will still be in 'data'

# Project Structure
```
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|   |
|   +-- ui            # components added by shadcn are installed here
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|   |                 
|   +-- pieces        # Stores everything that has to do with specifically pieces (eg: components, logic, types etc.)
|   |
|   +-- boards        # Stores everything that has to do with specifically boards
|   |
|   +-- games         # Stores everything that has to do with specifically games
|   |
|   +-- instances     # Stores everything that has to do with specifically instances
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores (Not necessary yet, basically allows for more complex interaction with localstorage)
|
+-- testing           # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
|
+-- App.tsx           # Child component of Main, anything rendered here will be rendered on every page of the website
|
+-- Main.tsx          # Parent component for the website all configuration is done here (eg: routing)
```
