import { Color } from "@lib/cubes/types";
import Cube from "./Cube";
import Scramble from "./Scramble";
import { Solver } from "./Solver";
import { ThreeByThree } from "./ThreeByThree";

class Test {
   private _cube: Cube;
   private _scramble: Scramble;

   constructor() {
      const { White, Yellow, Blue, Green, Red, Orange } = Color;

      this._cube = new ThreeByThree([
         Array(9).fill(White),
         Array(9).fill(Orange),
         Array(9).fill(Green),
         Array(9).fill(Red),
         Array(9).fill(Blue),
         Array(9).fill(Yellow),
      ]);

      this._scramble = new Scramble();
   }

   public get scramble(): Scramble {
      return this._scramble;
   }

   public set scramble(v: Scramble) {
      this.scramble = v;
   }

   public testScramble() {
      console.log("Testing scrambles");
      for (let i = 0; i < 1e6; i++) {
         let randomScramble = this.scramble.generateRandomScramble();
         if (
            this._cube.move(randomScramble) !==
            this._cube.move(this.scramble.inverseScramble(randomScramble))
         ) {
            console.error("Test not passed.");
            return false;
         }
      }
      console.log("Test succesfully passed.");
      return true;
   }

   public testWhiteCross(): boolean {
      console.log("Testing white cross");
      const nbTests = 1e5;
      for (let i = 0; i < nbTests; i++) {
         const solver = new Solver();
         solver.solveWhiteCross();
         const cubeArray = solver.cube.cubeArray;
         if (
            cubeArray[0][1] !== Color.White ||
            cubeArray[0][3] !== Color.White ||
            cubeArray[0][5] !== Color.White ||
            cubeArray[0][7] !== Color.White ||
            cubeArray[1][1] !== Color.Orange ||
            cubeArray[2][1] !== Color.Green ||
            cubeArray[3][1] !== Color.Red ||
            cubeArray[4][1] !== Color.Blue
         ) {
            console.error("Test not passed.");
            return false;
         }
      }
      console.log("Test succesfully passed.");
      return true;
   }
}

export default Test;

