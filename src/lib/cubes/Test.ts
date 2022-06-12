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

  public testWhiteCross(nbTests: number): boolean {
    console.log("Testing white cross");
    for (let i = 0; i < nbTests; i++) {
      const solver = new Solver();
      solver.cube.resetCubeArray();
      solver.cube.move(this.scramble.generateRandomScramble());
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

  public testF2L(nbTests: number): boolean {
    console.log("Testing F2L");
    for (let i = 0; i < nbTests; i++) {
      const solver = new Solver();
      solver.cube.resetCubeArray();
      solver.cube.move(this.scramble.generateRandomScramble());

      solver.solveWhiteCross();
      solver.cube.move("x2");
      solver.solveAllF2L();
      solver.cube.move("x2");
      const cubeArray = solver.cube.cubeArray;
      if (
        cubeArray[0][0] !== Color.White ||
        cubeArray[0][1] !== Color.White ||
        cubeArray[0][2] !== Color.White ||
        cubeArray[0][3] !== Color.White ||
        cubeArray[0][5] !== Color.White ||
        cubeArray[0][6] !== Color.White ||
        cubeArray[0][7] !== Color.White ||
        cubeArray[0][8] !== Color.White ||
        cubeArray[1][0] !== Color.Orange ||
        cubeArray[1][1] !== Color.Orange ||
        cubeArray[1][2] !== Color.Orange ||
        cubeArray[1][3] !== Color.Orange ||
        cubeArray[1][4] !== Color.Orange ||
        cubeArray[1][5] !== Color.Orange ||
        cubeArray[2][0] !== Color.Green ||
        cubeArray[2][1] !== Color.Green ||
        cubeArray[2][2] !== Color.Green ||
        cubeArray[2][3] !== Color.Green ||
        cubeArray[2][4] !== Color.Green ||
        cubeArray[2][5] !== Color.Green ||
        cubeArray[3][0] !== Color.Red ||
        cubeArray[3][1] !== Color.Red ||
        cubeArray[3][2] !== Color.Red ||
        cubeArray[3][3] !== Color.Red ||
        cubeArray[3][4] !== Color.Red ||
        cubeArray[3][5] !== Color.Red ||
        cubeArray[4][0] !== Color.Blue ||
        cubeArray[4][1] !== Color.Blue ||
        cubeArray[4][2] !== Color.Blue ||
        cubeArray[4][3] !== Color.Blue ||
        cubeArray[4][4] !== Color.Blue ||
        cubeArray[4][5] !== Color.Blue
      ) {
        console.error("Test not passed.");
        return false;
      }
    }
    console.log("Test succesfully passed.");
    return true;
  }

  public testOLL(nbTests: number): boolean {
    console.log("Testing OLL");
    const solver = new Solver();
    for (let i = 0; i < nbTests; i++) {
      // solver.cube.resetCubeArray();
      solver.reset();
      solver.cube.move(this.scramble.generateRandomScramble());

      solver.solveWhiteCross();
      solver.cube.move("x2");
      solver.solveAllF2L();
      solver.solveOLL();
      solver.cube.move("x2");
      const cubeArray = solver.cube.cubeArray;
      if (
        cubeArray[0][0] !== Color.White ||
        cubeArray[0][1] !== Color.White ||
        cubeArray[0][2] !== Color.White ||
        cubeArray[0][3] !== Color.White ||
        cubeArray[0][5] !== Color.White ||
        cubeArray[0][6] !== Color.White ||
        cubeArray[0][7] !== Color.White ||
        cubeArray[0][8] !== Color.White ||
        cubeArray[1][0] !== Color.Orange ||
        cubeArray[1][1] !== Color.Orange ||
        cubeArray[1][2] !== Color.Orange ||
        cubeArray[1][3] !== Color.Orange ||
        cubeArray[1][4] !== Color.Orange ||
        cubeArray[1][5] !== Color.Orange ||
        cubeArray[2][0] !== Color.Green ||
        cubeArray[2][1] !== Color.Green ||
        cubeArray[2][2] !== Color.Green ||
        cubeArray[2][3] !== Color.Green ||
        cubeArray[2][4] !== Color.Green ||
        cubeArray[2][5] !== Color.Green ||
        cubeArray[3][0] !== Color.Red ||
        cubeArray[3][1] !== Color.Red ||
        cubeArray[3][2] !== Color.Red ||
        cubeArray[3][3] !== Color.Red ||
        cubeArray[3][4] !== Color.Red ||
        cubeArray[3][5] !== Color.Red ||
        cubeArray[4][0] !== Color.Blue ||
        cubeArray[4][1] !== Color.Blue ||
        cubeArray[4][2] !== Color.Blue ||
        cubeArray[4][3] !== Color.Blue ||
        cubeArray[4][4] !== Color.Blue ||
        cubeArray[4][5] !== Color.Blue ||
        cubeArray[5][0] !== Color.Yellow ||
        cubeArray[5][1] !== Color.Yellow ||
        cubeArray[5][2] !== Color.Yellow ||
        cubeArray[5][3] !== Color.Yellow ||
        cubeArray[5][4] !== Color.Yellow ||
        cubeArray[5][5] !== Color.Yellow ||
        cubeArray[5][6] !== Color.Yellow ||
        cubeArray[5][7] !== Color.Yellow ||
        cubeArray[5][8] !== Color.Yellow
      ) {
        console.error("OLL tests not passed.");
        console.log(solver.solution, Cube.getColorArray(solver.cube.cubeArray));
        return false;
      }
    }
    console.log("Test succesfully passed.");
    return true;
  }

  /*public testPLL(nbTests: number): boolean {
      console.log("Testing PLL");
      for (let i = 0; i < nbTests; i++) {
         const solver = new Solver();
         solver.cube.resetCubeArray();
         solver.cube.move(this.scramble.generateRandomScramble());

         solver.solveWhiteCross();
         solver.cube.move("x2");
         solver.solveAllF2L();
         solver.solveOLL();
         solver.solvePLL();
         solver.cube.move("x2");
         const cubeArray = solver.cube.cubeArray;
         if (
            cubeArray[0][0] !== Color.White ||
            cubeArray[0][1] !== Color.White ||
            cubeArray[0][2] !== Color.White ||
            cubeArray[0][3] !== Color.White ||
            cubeArray[0][5] !== Color.White ||
            cubeArray[0][6] !== Color.White ||
            cubeArray[0][7] !== Color.White ||
            cubeArray[0][8] !== Color.White ||
            cubeArray[1][0] !== Color.Orange ||
            cubeArray[1][1] !== Color.Orange ||
            cubeArray[1][2] !== Color.Orange ||
            cubeArray[1][3] !== Color.Orange ||
            cubeArray[1][4] !== Color.Orange ||
            cubeArray[1][5] !== Color.Orange ||
            cubeArray[1][6] !== Color.Orange ||
            cubeArray[1][7] !== Color.Orange ||
            cubeArray[1][8] !== Color.Orange ||
            cubeArray[2][0] !== Color.Green ||
            cubeArray[2][1] !== Color.Green ||
            cubeArray[2][2] !== Color.Green ||
            cubeArray[2][3] !== Color.Green ||
            cubeArray[2][4] !== Color.Green ||
            cubeArray[2][5] !== Color.Green ||
            cubeArray[2][6] !== Color.Green ||
            cubeArray[2][7] !== Color.Green ||
            cubeArray[2][8] !== Color.Green ||
            cubeArray[3][0] !== Color.Red ||
            cubeArray[3][1] !== Color.Red ||
            cubeArray[3][2] !== Color.Red ||
            cubeArray[3][3] !== Color.Red ||
            cubeArray[3][4] !== Color.Red ||
            cubeArray[3][5] !== Color.Red ||
            cubeArray[3][6] !== Color.Red ||
            cubeArray[3][7] !== Color.Red ||
            cubeArray[3][8] !== Color.Red ||
            cubeArray[4][0] !== Color.Blue ||
            cubeArray[4][1] !== Color.Blue ||
            cubeArray[4][2] !== Color.Blue ||
            cubeArray[4][3] !== Color.Blue ||
            cubeArray[4][4] !== Color.Blue ||
            cubeArray[4][5] !== Color.Blue ||
            cubeArray[4][6] !== Color.Blue ||
            cubeArray[4][7] !== Color.Blue ||
            cubeArray[4][8] !== Color.Blue ||
            cubeArray[5][0] !== Color.Yellow ||
            cubeArray[5][1] !== Color.Yellow ||
            cubeArray[5][2] !== Color.Yellow ||
            cubeArray[5][3] !== Color.Yellow ||
            cubeArray[5][4] !== Color.Yellow ||
            cubeArray[5][5] !== Color.Yellow ||
            cubeArray[5][6] !== Color.Yellow ||
            cubeArray[5][7] !== Color.Yellow ||
            cubeArray[5][8] !== Color.Yellow 
         ) {
            console.error("Test not passed.");
            return false;
         }
      }
      console.log("Test succesfully passed.");
      return true;
   }*/
}

export default Test;
