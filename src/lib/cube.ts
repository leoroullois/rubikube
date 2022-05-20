import { Color, ColorMapping, Position, Rubik, StateMapping } from "./types";

export const generatePositions = (): Position[] => {
   let newCubePositions: Position[] = [];
   for (let z = 1; z >= -1; z--) {
      for (let y = -1; y <= 1; y++) {
         for (let x = 1; x >= -1; x--) {
            newCubePositions.push([x, y, z]);
         }
      }
   }
   return newCubePositions;
};

export const stateMapping: StateMapping = {
   0: {
      0: [2, 8],
      1: [3, 6],
      2: null,
      3: null,
      4: null,
      5: [5, 2],
   },
   1: {
      0: [2, 7],
      1: null,
      2: null,
      3: null,
      4: null,
      5: [5, 1],
   },
   2: {
      0: [2, 6],
      1: null,
      2: null,
      3: null,
      4: [1, 8],
      5: [5, 0],
   },
   3: {
      0: [2, 5],
      1: [3, 3],
      2: null,
      3: null,
      4: null,
      5: null,
   },
   4: {
      0: [2, 4],
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   5: {
      0: [2, 3],
      1: null,
      2: null,
      3: null,
      4: [1, 5],
      5: null,
   },
   6: {
      0: [2, 2],
      1: [3, 0],
      2: [0, 8],
      3: null,
      4: null,
      5: null,
   },
   7: {
      0: [2, 1],
      1: null,
      2: [0, 7],
      3: null,
      4: null,
      5: null,
   },
   8: {
      0: [2, 1],
      1: null,
      2: [0, 6],
      3: null,
      4: [1, 2],
      5: null,
   },
   9: {
      0: null,
      1: [3, 7],
      2: null,
      3: null,
      4: null,
      5: [5, 5],
   },
   10: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: [5, 4],
   },
   11: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: [1, 7],
      5: [5, 3],
   },
   12: {
      0: null,
      1: [3, 4],
      2: null,
      3: null,
      4: null,
      5: null,
   },
   13: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   14: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: [1, 4],
      5: null,
   },
   15: {
      0: null,
      1: [3, 1],
      2: [0, 5],
      3: null,
      4: null,
      5: null,
   },
   16: {
      0: null,
      1: null,
      2: [0, 4],
      3: null,
      4: null,
      5: null,
   },
   17: {
      0: null,
      1: null,
      2: [0, 3],
      3: null,
      4: [1, 1],
      5: null,
   },
   18: {
      0: null,
      1: [3, 8],
      2: null,
      3: [4, 6],
      4: null,
      5: [5, 8],
   },
   19: {
      0: null,
      1: null,
      2: null,
      3: [4, 7],
      4: null,
      5: [5, 7],
   },
   20: {
      0: null,
      1: null,
      2: null,
      3: [4, 8],
      4: [1, 6],
      5: [5, 6],
   },
   21: {
      0: null,
      1: [3, 5],
      2: null,
      3: [4, 3],
      4: null,
      5: null,
   },
   22: {
      0: null,
      1: null,
      2: null,
      3: [4, 4],
      4: null,
      5: null,
   },
   23: {
      0: null,
      1: null,
      2: null,
      3: [4, 5],
      4: [1, 3],
      5: null,
   },
   24: {
      0: null,
      1: [3, 2],
      2: [0, 2],
      3: [4, 0],
      4: null,
      5: null,
   },
   25: {
      0: null,
      1: null,
      2: [0, 1],
      3: [4, 1],
      4: null,
      5: null,
   },
   26: {
      0: null,
      1: null,
      2: [0, 0],
      3: [4, 2],
      4: [1, 0],
      5: null,
   },
};

// ? export const generateState = (): StateMapping => {};

const { White, Orange, Yellow, Blue, Green, Red } = ColorMapping;
export const solvedCube: Rubik = {
   0: {
      0: Green,
      1: Red,
      2: null,
      3: null,
      4: null,
      5: Yellow,
   },
   1: {
      0: Green,
      1: null,
      2: null,
      3: null,
      4: null,
      5: Yellow,
   },
   2: {
      0: Green,
      1: null,
      2: null,
      3: null,
      4: Orange,
      5: Yellow,
   },
   3: {
      0: Green,
      1: Red,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   4: {
      0: Green,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   5: {
      0: Green,
      1: null,
      2: null,
      3: null,
      4: Orange,
      5: null,
   },
   6: {
      0: Green,
      1: Red,
      2: White,
      3: null,
      4: null,
      5: null,
   },
   7: {
      0: Green,
      1: null,
      2: White,
      3: null,
      4: null,
      5: null,
   },
   8: {
      0: Green,
      1: null,
      2: White,
      3: null,
      4: Orange,
      5: null,
   },
   9: {
      0: null,
      1: Red,
      2: null,
      3: null,
      4: null,
      5: Yellow,
   },
   10: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: Yellow,
   },
   11: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: Orange,
      5: Yellow,
   },
   12: {
      0: null,
      1: Red,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   13: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
   },
   14: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: Orange,
      5: null,
   },
   15: {
      0: null,
      1: Red,
      2: White,
      3: null,
      4: null,
      5: null,
   },
   16: {
      0: null,
      1: null,
      2: White,
      3: null,
      4: null,
      5: null,
   },
   17: {
      0: null,
      1: null,
      2: White,
      3: null,
      4: Orange,
      5: null,
   },
   18: {
      0: null,
      1: Red,
      2: null,
      3: Blue,
      4: null,
      5: Yellow,
   },
   19: {
      0: null,
      1: null,
      2: null,
      3: Blue,
      4: null,
      5: Yellow,
   },
   20: {
      0: null,
      1: null,
      2: null,
      3: Blue,
      4: Orange,
      5: Yellow,
   },
   21: {
      0: null,
      1: Red,
      2: null,
      3: Blue,
      4: null,
      5: null,
   },
   22: {
      0: null,
      1: null,
      2: null,
      3: Blue,
      4: null,
      5: null,
   },
   23: {
      0: null,
      1: null,
      2: null,
      3: Blue,
      4: Orange,
      5: null,
   },
   24: {
      0: null,
      1: Red,
      2: White,
      3: Blue,
      4: null,
      5: null,
   },
   25: {
      0: null,
      1: null,
      2: White,
      3: Blue,
      4: null,
      5: null,
   },
   26: {
      0: null,
      1: null,
      2: White,
      3: Blue,
      4: Orange,
      5: null,
   },
};

export type CubeArray = Color[][];

export const initialCubeArray: CubeArray = [
   Array(9).fill(White),
   Array(9).fill(Orange),
   Array(9).fill(Green),
   Array(9).fill(Red),
   Array(9).fill(Blue),
   Array(9).fill(Yellow),
];

export const cubeArrayToRubik = (cubeArray: CubeArray): Rubik => {
   const rubik: any = solvedCube;
   for (const [stateMappingKey, cube] of Object.entries(stateMapping)) {
      if (rubik.hasOwnProperty(stateMappingKey)) {
         for (const [cubeKey, color] of Object.entries(cube)) {
            if (cube.hasOwnProperty(cubeKey)) {
               if (color) {
                  rubik[stateMappingKey][cubeKey] =
                     cubeArray[color[0]][color[1]];
               }
            }
         }
      }
   }
   return rubik as Rubik;
};

