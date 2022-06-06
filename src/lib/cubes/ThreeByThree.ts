import {
   Color,
   CubeArray,
   HexColor,
   HexRubik,
   Position,
   Rubik,
   StateMapping,
} from "@lib/cubes/types";

import { solvedCubeArray, solvedHexRubik, stateMapping } from "./constants";
import Cube from "./Cube";
import Scramble from "./Scramble";

export class ThreeByThree extends Cube {
   private _stateMapping: StateMapping;
   private _cubeArray: CubeArray;
   private _solvedCubeArray: CubeArray;
   private _solvedHexRubik: HexRubik;
   private _scramble: string;
   public constructor(cubeArray?: CubeArray) {
      super();
      // ? Représentation des 26 pièces du cube
      this._stateMapping = stateMapping;
      // ? Si cubeArray n'est pas fourni, utiliser le cubeArray résolu
      this._cubeArray = cubeArray ?? solvedCubeArray;
      // ? Tjrs égale au cubeArray résolu
      this._solvedCubeArray = solvedCubeArray;
      this._solvedHexRubik = solvedHexRubik;
      this._scramble = "";
   }

   public get scramble(): string {
      return this._scramble;
   }

   public set scramble(v: string) {
      this._scramble = v;
   }

   public resetCubeArray(): void {
      this._cubeArray = [
         Array(9).fill(Color.White),
         Array(9).fill(Color.Orange),
         Array(9).fill(Color.Green),
         Array(9).fill(Color.Red),
         Array(9).fill(Color.Blue),
         Array(9).fill(Color.Yellow),
      ];
      this.scramble = "";
   }
   public randomlyScrambleCube(): void {
      const scramble = new Scramble().scramble;
      this.resetCubeArray();
      this.move(scramble);
      this.scramble = scramble;
   }
   public getRubik = (): Rubik => {
      const rubik: any = this.solvedHexRubik;
      for (const [stateMappingKey, cube] of Object.entries(this.stateMapping)) {
         if (rubik.hasOwnProperty(stateMappingKey)) {
            for (const [cubeKey, color] of Object.entries(cube)) {
               if (cube.hasOwnProperty(cubeKey)) {
                  if (color) {
                     rubik[stateMappingKey][cubeKey] =
                        this.cubeArray[color[0]][color[1]];
                  }
               }
            }
         }
      }
      return rubik as Rubik;
   };

   public getColorRubik() {
      const rubik = this.getRubik();
      return Object.values(rubik).map((piece) => {
         return Object.values(piece).map((color) => {
            return ThreeByThree.mapColor(color);
         });
      });
   }

   public getMinimalColorRubik() {
      const rubik = this.getRubik();
      return Object.values(rubik).map((piece) => {
         return Object.values(piece)
            .map((color) => {
               return ThreeByThree.mapColor(color);
            })
            .filter((color) => color !== "");
      });
   }

   public getHexRubik = (): HexRubik => {
      const rubik: any = this.solvedHexRubik;
      for (const [stateMappingKey, cube] of Object.entries(this.stateMapping)) {
         if (rubik.hasOwnProperty(stateMappingKey)) {
            for (const [cubeKey, color] of Object.entries(cube)) {
               if (cube.hasOwnProperty(cubeKey)) {
                  if (color) {
                     rubik[stateMappingKey][cubeKey] =
                        this.getHexCubeArray()[color[0]][color[1]];
                  }
               }
            }
         }
      }
      return rubik as HexRubik;
   };

   private colorToHex(color: Color): HexColor {
      switch (color) {
         case Color.Blue:
            return HexColor.Blue;
         case Color.Red:
            return HexColor.Red;
         case Color.Green:
            return HexColor.Green;
         case Color.Yellow:
            return HexColor.Yellow;
         case Color.Orange:
            return HexColor.Orange;
         case Color.White:
            return HexColor.White;
         default:
            return HexColor.Black;
      }
   }

   public getHexCubeArray = (): HexColor[][] => {
      return this.cubeArray.map((face) => {
         return face.map((color) => {
            return this.colorToHex(color);
         });
      });
   };

   public get solvedHexRubik(): HexRubik {
      return this._solvedHexRubik;
   }

   public get solvedCubeArray(): CubeArray {
      return this._solvedCubeArray;
   }

   public set solvedCubeArray(v: CubeArray) {
      this._solvedCubeArray = v;
   }

   public get stateMapping(): StateMapping {
      return this._stateMapping;
   }

   public set stateMapping(v: StateMapping) {
      this._stateMapping = v;
   }

   public get cubeArray(): CubeArray {
      return this._cubeArray;
   }

   public set cubeArray(value: CubeArray) {
      this._cubeArray = value;
   }

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
   public override rotationFace(face: Color[]) {
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

   public override rotationFacePrime(face: Color[]) {
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

   private elementsToMoveRight(currentCube: Color[][]) {
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

   private elementsToMoveLeft(currentCube: Color[][]) {
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

      currentCube[1] = this.rotationFace(currentCube[1]);

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

      currentCube[1] = this.rotationFacePrime(currentCube[1]);

      this.cubeArray = currentCube;
   }

   public elementsToMoveFront(currentCube: Color[][]) {
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

   private elementsToMoveBack(currentCube: Color[][]) {
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

   private elementsToMoveUp(currentCube: Color[][]) {
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

   private elementsToMoveDown(currentCube: Color[][]) {
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

      newCube[4] = this.rotationFace(this.rotationFace(newCube[4]));
      newCube[5] = this.rotationFace(this.rotationFace(newCube[5]));

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

      newCube[0] = this.rotationFace(this.rotationFace(newCube[0]));
      newCube[4] = this.rotationFace(this.rotationFace(newCube[4]));

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
      newCube[0] = this.cubeArray[1];
      newCube[1] = this.cubeArray[5];
      newCube[5] = this.cubeArray[3];
      newCube[3] = this.cubeArray[0];

      newCube[0] = this.rotationFace(newCube[0]);
      newCube[1] = this.rotationFace(newCube[1]);
      newCube[2] = this.rotationFace(this.rotationFace(newCube[2]));
      newCube[3] = this.rotationFace(newCube[3]);
      newCube[4] = this.rotationFace(this.rotationFace(newCube[4]));
      newCube[5] = this.rotationFace(newCube[5]);

      newCube[2] = this.rotationFacePrime(newCube[2]);
      newCube[4] = this.rotationFace(newCube[4]);

      this.cubeArray = newCube;
   }

   public override rotateZi(): void {
      const newCube = [...this.cubeArray];
      newCube[0] = this.cubeArray[3];
      newCube[3] = this.cubeArray[5];
      newCube[5] = this.cubeArray[1];
      newCube[1] = this.cubeArray[0];

      newCube[0] = this.rotationFacePrime(newCube[0]);
      newCube[1] = this.rotationFacePrime(newCube[1]);
      newCube[2] = this.rotationFace(this.rotationFace(newCube[2]));
      newCube[3] = this.rotationFacePrime(newCube[3]);
      newCube[4] = this.rotationFace(this.rotationFace(newCube[4]));
      newCube[5] = this.rotationFacePrime(newCube[5]);

      newCube[2] = this.rotationFace(newCube[2]);
      newCube[4] = this.rotationFacePrime(newCube[4]);

      this.cubeArray = newCube;
   }

   private elementsToMoveMiddle(currentCube: Color[][]) {
      const whiteFace = currentCube[0].filter(
         (_element, i) => i === 1 || i === 4 || i === 7
      );
      const greenFace = currentCube[2].filter(
         (_element, i) => i === 1 || i === 4 || i === 7
      );
      const blueFace = currentCube[4].filter(
         (_element, i) => i === 1 || i === 4 || i === 7
      );
      const yellowFace = currentCube[5].filter(
         (_element, i) => i === 1 || i === 4 || i === 7
      );

      return {
         whiteFace,
         greenFace,
         blueFace,
         yellowFace,
      };
   }

   public override moveMiddle() {
      const currentCube = [...this.cubeArray];

      const { whiteFace, greenFace, blueFace, yellowFace } =
         this.elementsToMoveMiddle(currentCube);

      for (let i = 0; i < 3; i++) {
         currentCube[0].splice(3 * i + 1, 1, greenFace[i]);
         currentCube[2].splice(3 * i + 1, 1, yellowFace[i]);
         currentCube[4].splice(3 * i + 1, 1, whiteFace[2 - i]);
         currentCube[5].splice(3 * i + 1, 1, blueFace[2 - i]);
      }

      this.cubeArray = currentCube;
   }
}

