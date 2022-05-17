import { Position } from "./types";

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