import {
   Color,
   ColorMapping,
   CubeArray,
   Position,
   Rubik,
   StateMapping,
} from "@lib/cubes/types";
import Cube from "./Cube";

export class ThreeByThree extends Cube {
   private _stateMapping: StateMapping;
   // ? couleurs normales (0, 1 etc)
   private _cubeArray: CubeArray;
   private _solvedCube: Rubik;

   // ? vraies couleurs (0x)
   private _solvedCubeArray: CubeArray;

   public constructor(cubeArray?: CubeArray) {
      const { White, Orange, Yellow, Blue, Green, Red } = ColorMapping;
      super();
      this._stateMapping = {
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
      this._solvedCubeArray = [
         Array(9).fill(White),
         Array(9).fill(Orange),
         Array(9).fill(Green),
         Array(9).fill(Red),
         Array(9).fill(Blue),
         Array(9).fill(Yellow),
      ];
      this._cubeArray = cubeArray ?? [
         Array(9).fill(White),
         Array(9).fill(Orange),
         Array(9).fill(Green),
         Array(9).fill(Red),
         Array(9).fill(Blue),
         Array(9).fill(Yellow),
      ];
      this._solvedCube = {
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
   }

   public get solvedCubeArray(): CubeArray {
      return this.solvedCubeArray;
   }

   public get stateMapping(): StateMapping {
      return this._stateMapping;
   }

   public set stateMapping(v: StateMapping) {
      this._stateMapping = v;
   }
   public get solvedCube(): Rubik {
      return this._solvedCube;
   }

   public set solvedCube(v: Rubik) {
      this.solvedCube = v;
   }

   public get cubeArray(): CubeArray {
      return this._cubeArray;
   }

   public set cubeArray(value: CubeArray) {
      this._cubeArray = value;
   }

   public cubeArrayToRubik = (cubeArray: CubeArray): Rubik => {
      const rubik: any = this.solvedCube;
      for (const [stateMappingKey, cube] of Object.entries(this.stateMapping)) {
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
   public getCubePositions = (): Position[] => {
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
   public override rotationFace(face: ColorMapping[]) {
      return [
         face[6],
         face[3],
         face[0],
         face[7],
         face[4],
         face[1],
         face[8],
         face[5],
         face[2],
      ];
   }

   public override rotationFacePrime(face: ColorMapping[]) {
      return [
         face[2],
         face[5],
         face[8],
         face[1],
         face[4],
         face[7],
         face[0],
         face[3],
         face[6],
      ];
   }

   private elementsToMoveRight(currentCube: ColorMapping[][]) {
      const whiteFace = currentCube[0].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );
      const greenFace = currentCube[2].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );
      const blueFace = currentCube[4].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );
      const yellowFace = currentCube[5].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );

      return {
         whiteFace,
         greenFace,
         blueFace,
         yellowFace,
      };
   }

   public override moveRight() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, greenFace, blueFace, yellowFace } =
         this.elementsToMoveRight(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i * 3 + 2, 1, greenFace[i]);
         currentCube[2].splice(i * 3 + 2, 1, yellowFace[i]);
         currentCube[4].splice(i * 3, 1, whiteFace[2 - i]);
         currentCube[5].splice(i * 3 + 2, 1, blueFace[2 - i]);
      }

      currentCube[3] = this.rotationFace(currentCube[3]);

      this.cubeArray = currentCube;
   }

   public override moveRightPrime() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, greenFace, blueFace, yellowFace } =
         this.elementsToMoveRight(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i * 3 + 2, 1, blueFace[2 - i]);
         currentCube[2].splice(i * 3 + 2, 1, whiteFace[i]);
         currentCube[4].splice(i * 3, 1, yellowFace[2 - i]);
         currentCube[5].splice(i * 3 + 2, 1, greenFace[i]);
      }

      currentCube[3] = this.rotationFacePrime(currentCube[3]);

      this.cubeArray = currentCube;
   }

   private elementsToMoveLeft(currentCube: ColorMapping[][]) {
      const whiteFace = currentCube[0].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );
      const greenFace = currentCube[2].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );
      const blueFace = currentCube[4].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );
      const yellowFace = currentCube[5].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );

      return {
         whiteFace,
         greenFace,
         blueFace,
         yellowFace,
      };
   }

   public override moveLeft() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, greenFace, blueFace, yellowFace } =
         this.elementsToMoveLeft(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i * 3, 1, blueFace[2 - i]);
         currentCube[2].splice(i * 3, 1, whiteFace[i]);
         currentCube[4].splice(i * 3 + 2, 1, yellowFace[2 - i]);
         currentCube[5].splice(i * 3, 1, greenFace[i]);
      }

      currentCube[1] = this.rotationFacePrime(currentCube[1]);

      this.cubeArray = currentCube;
   }

   public override moveLeftPrime() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, greenFace, blueFace, yellowFace } =
         this.elementsToMoveLeft(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i * 3, 1, greenFace[i]);
         currentCube[2].splice(i * 3, 1, yellowFace[i]);
         currentCube[4].splice(i * 3 + 2, 1, whiteFace[2 - i]);
         currentCube[5].splice(i * 3, 1, blueFace[2 - i]);
      }

      currentCube[1] = this.rotationFace(currentCube[1]);

      this.cubeArray = currentCube;
   }

   public elementsToMoveFront(currentCube: ColorMapping[][]) {
      const whiteFace = currentCube[0].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );
      const orangeFace = currentCube[1].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );
      const redFace = currentCube[3].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );
      const yellowFace = currentCube[5].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );

      return {
         whiteFace,
         orangeFace,
         redFace,
         yellowFace,
      };
   }

   public override moveFront() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, orangeFace, redFace, yellowFace } =
         this.elementsToMoveFront(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(6 + i, 1, orangeFace[2 - i]);
         currentCube[1].splice(i * 3 + 2, 1, yellowFace[i]);
         currentCube[3].splice(i * 3, 1, whiteFace[i]);
         currentCube[5].splice(i, 1, redFace[2 - i]);
      }

      currentCube[2] = this.rotationFace(currentCube[2]);

      this.cubeArray = currentCube;
   }

   public override moveFrontPrime() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, orangeFace, redFace, yellowFace } =
         this.elementsToMoveFront(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(6 + i, 1, redFace[i]);
         currentCube[1].splice(i * 3 + 2, 1, whiteFace[2 - i]);
         currentCube[3].splice(i * 3, 1, yellowFace[2 - i]);
         currentCube[5].splice(i, 1, orangeFace[i]);
      }

      currentCube[2] = this.rotationFacePrime(currentCube[2]);

      this.cubeArray = currentCube;
   }

   private elementsToMoveBack(currentCube: ColorMapping[][]) {
      const whiteFace = currentCube[0].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );
      const orangeFace = currentCube[1].filter(
         (_element, i) => i === 0 || i === 3 || i === 6
      );
      const redFace = currentCube[3].filter(
         (_element, i) => i === 2 || i === 5 || i === 8
      );
      const yellowFace = currentCube[5].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );

      return {
         whiteFace,
         orangeFace,
         redFace,
         yellowFace,
      };
   }

   public override moveBack() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, orangeFace, redFace, yellowFace } =
         this.elementsToMoveBack(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i, 1, redFace[i]);
         currentCube[1].splice(i * 3, 1, whiteFace[2 - i]);
         currentCube[3].splice(i * 3 + 2, 1, yellowFace[2 - i]);
         currentCube[5].splice(6 + i, 1, orangeFace[i]);
      }

      currentCube[4] = this.rotationFace(currentCube[4]);

      this.cubeArray = currentCube;
   }

   public override moveBackPrime() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, orangeFace, redFace, yellowFace } =
         this.elementsToMoveBack(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(i, 1, orangeFace[2 - i]);
         currentCube[1].splice(i * 3, 1, yellowFace[i]);
         currentCube[3].splice(i * 3 + 2, 1, whiteFace[i]);
         currentCube[5].splice(6 + i, 1, redFace[2 - i]);
      }

      currentCube[4] = this.rotationFacePrime(currentCube[4]);

      this.cubeArray = currentCube;
   }

   private elementsToMoveUp(currentCube: ColorMapping[][]) {
      const orangeFace = currentCube[1].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );
      const greenFace = currentCube[2].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );
      const redFace = currentCube[3].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );
      const blueFace = currentCube[4].filter(
         (_element, i) => i === 0 || i === 1 || i === 2
      );

      return {
         orangeFace,
         greenFace,
         redFace,
         blueFace,
      };
   }

   public override moveUp() {
      const currentCube = [...this.cubeArray];

      const { orangeFace, greenFace, redFace, blueFace } =
         this.elementsToMoveUp(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[1].splice(i, 1, greenFace[i]);
         currentCube[2].splice(i, 1, redFace[i]);
         currentCube[3].splice(i, 1, blueFace[i]);
         currentCube[4].splice(i, 1, orangeFace[i]);
      }

      currentCube[0] = this.rotationFace(currentCube[0]);

      this.cubeArray = currentCube;
   }

   public override moveUpPrime() {
      const currentCube = [...this.cubeArray];

      const { orangeFace, greenFace, redFace, blueFace } =
         this.elementsToMoveUp(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[1].splice(i, 1, blueFace[i]);
         currentCube[2].splice(i, 1, orangeFace[i]);
         currentCube[3].splice(i, 1, greenFace[i]);
         currentCube[4].splice(i, 1, redFace[i]);
      }

      currentCube[0] = this.rotationFacePrime(currentCube[0]);

      this.cubeArray = currentCube;
   }

   private elementsToMoveDown(currentCube: ColorMapping[][]) {
      const orangeFace = currentCube[1].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );
      const greenFace = currentCube[2].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );
      const redFace = currentCube[3].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );
      const blueFace = currentCube[4].filter(
         (_element, i) => i === 6 || i === 7 || i === 8
      );

      return {
         orangeFace,
         greenFace,
         redFace,
         blueFace,
      };
   }

   public override moveDown() {
      const currentCube = [...this.cubeArray];

      const { orangeFace, greenFace, redFace, blueFace } =
         this.elementsToMoveDown(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[1].splice(6 + i, 1, blueFace[i]);
         currentCube[2].splice(6 + i, 1, orangeFace[i]);
         currentCube[3].splice(6 + i, 1, greenFace[i]);
         currentCube[4].splice(6 + i, 1, redFace[i]);
      }

      currentCube[5] = this.rotationFace(currentCube[5]);

      this.cubeArray = currentCube;
   }

   public override moveDownPrime() {
      const currentCube = [...this.cubeArray];

      const { orangeFace, greenFace, redFace, blueFace } =
         this.elementsToMoveDown(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[1].splice(6 + i, 1, greenFace[i]);
         currentCube[2].splice(6 + i, 1, redFace[i]);
         currentCube[3].splice(6 + i, 1, blueFace[i]);
         currentCube[4].splice(6 + i, 1, orangeFace[i]);
      }

      currentCube[5] = this.rotationFacePrime(currentCube[5]);

      this.cubeArray = currentCube;
   }

   public override rotateX(): void {
      const newCube = [...this.cubeArray];
      newCube[0] = this.cubeArray[2];
      newCube[2] = this.cubeArray[5];
      newCube[5] = this.cubeArray[4];
      newCube[4] = this.cubeArray[0];

      newCube[3] = this.rotationFace(newCube[3]);
      newCube[1] = this.rotationFacePrime(newCube[1]);

      this.cubeArray = newCube;
   }

   public override rotateXi(): void {
      const newCube = [...this.cubeArray];
      newCube[0] = this.cubeArray[4];
      newCube[4] = this.cubeArray[5];
      newCube[5] = this.cubeArray[2];
      newCube[2] = this.cubeArray[0];

      newCube[3] = this.rotationFacePrime(newCube[3]);
      newCube[1] = this.rotationFace(newCube[1]);

      this.cubeArray = newCube;
   }

   public override rotateY(): void {
      const newCube = [...this.cubeArray];
      newCube[2] = this.cubeArray[3];
      newCube[3] = this.cubeArray[4];
      newCube[4] = this.cubeArray[1];
      newCube[1] = this.cubeArray[2];

      newCube[0] = this.rotationFace(newCube[0]);
      newCube[5] = this.rotationFacePrime(newCube[5]);

      this.cubeArray = newCube;
   }

   public override rotateYi(): void {
      const newCube = [...this.cubeArray];
      newCube[2] = this.cubeArray[1];
      newCube[1] = this.cubeArray[4];
      newCube[4] = this.cubeArray[3];
      newCube[3] = this.cubeArray[2];

      newCube[0] = this.rotationFacePrime(newCube[0]);
      newCube[5] = this.rotationFace(newCube[5]);

      this.cubeArray = newCube;
   }

   public override rotateZ(): void {
      const newCube = [...this.cubeArray];
      newCube[0] = this.cubeArray[3];
      newCube[3] = this.cubeArray[5];
      newCube[5] = this.cubeArray[1];
      newCube[1] = this.cubeArray[0];

      newCube[2] = this.rotationFace(newCube[2]);
      newCube[4] = this.rotationFacePrime(newCube[4]);

      this.cubeArray = newCube;
   }

   public override rotateZi(): void {
      const newCube = [...this.cubeArray];
      newCube[0] = this.cubeArray[1];
      newCube[1] = this.cubeArray[5];
      newCube[5] = this.cubeArray[3];
      newCube[3] = this.cubeArray[0];

      newCube[2] = this.rotationFacePrime(newCube[2]);
      newCube[4] = this.rotationFace(newCube[4]);

      this.cubeArray = newCube;
   }
}

