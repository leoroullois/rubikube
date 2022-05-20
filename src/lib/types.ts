export enum Color {
   White = 0,
   Orange = 1,
   Yellow = 5,
   Blue = 4,
   Green = 2,
   Red = 3,
}
export enum ColorMapping {
   Red = 0xc0392b,
   Green = 0x27ae60,
   Blue = 0x2980b9,
   Yellow = 0xf1c40f,
   Orange = 0xd35400,
   White = 0xecf0f1,
   Black = 0x2d3436,
}

export type Position = [x: number, y: number, z: number];

export interface IPieceState<T> {
   0: T | null;
   1: T | null;
   2: T | null;
   3: T | null;
   4: T | null;
   5: T | null;
}
type StateMappingType = [number, number];

type RubikState<T> = {
   0: IPieceState<T>;
   1: IPieceState<T>;
   2: IPieceState<T>;
   3: IPieceState<T>;
   4: IPieceState<T>;
   5: IPieceState<T>;
   6: IPieceState<T>;
   7: IPieceState<T>;
   8: IPieceState<T>;
   9: IPieceState<T>;
   10: IPieceState<T>;
   11: IPieceState<T>;
   12: IPieceState<T>;
   13: IPieceState<T>;
   14: IPieceState<T>;
   15: IPieceState<T>;
   16: IPieceState<T>;
   17: IPieceState<T>;
   18: IPieceState<T>;
   19: IPieceState<T>;
   20: IPieceState<T>;
   21: IPieceState<T>;
   22: IPieceState<T>;
   23: IPieceState<T>;
   24: IPieceState<T>;
   25: IPieceState<T>;
   26: IPieceState<T>;
};

export type StateMapping = RubikState<StateMappingType>;
export type Rubik = RubikState<ColorMapping>;

