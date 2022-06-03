import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import Cube from "./Cube";
import { CubeArray } from "./types";

class Genetic {
   private static PERMUTATIONS: string[] = [
      // permutes two edges: U face, bottom edge and right edge
      "F' L' B' R' U' R U' B L F R U R' U",
      // permutes two edges: U face, bottom edge and left edge
      "F R B L U L' U B' R' F' L' U' L U'",
      // permutes two corners: U face, bottom left and bottom right
      "U2 B U2 B' R2 F R' F' U2 F' U2 F R'",
      // permutes three corners: U face, bottom left and top left
      "U2 R U2 R' F2 L F' L' U2 L' U2 L F'",
      // permutes three centers: F face, top, right, bottom
      "U' B2 D2 L' F2 D2 B2 R' U'",
      // permutes three centers: F face, top, right, left
      "U B2 D2 R F2 D2 B2 L U",
      // U face: bottom edge <-> right edge, bottom right corner <-> top right corner
      "D' R' D R2 U' R B2 L U' L' B2 U R2",
      // U face: bottom edge <-> right edge, bottom right corner <-> left right corner
      "D L D' L2 U L' B2 R' U R B2 U' L2",
      // U face: top edge <-> bottom edge, bottom left corner <-> top right corner
      "R' U L' U2 R U' L R' U L' U2 R U' L U'",
      // U face: top edge <-> bottom edge, bottom right corner <-> top left corner
      "L U' R U2 L' U R' L U' R U2 L' U R' U",
      // permutes three corners: U face, bottom right, bottom left and top left
      "F' U B U' F U B' U'",
      // permutes three corners: U face, bottom left, bottom right and top right
      "F U' B' U F' U' B U",
      // permutes three edges: F face bottom, F face top, B face top
      "L' U2 L R' F2 R",
      // permutes three edges: F face top, B face top, B face bottom
      "R' U2 R L' B2 L",
      // H permutation: U Face, swaps the edges horizontally and vertically
      "M2 U M2 U2 M2 U M2",
   ];
   private static FULL_ROTATIONS: string[] = ["x", "x'", "x2", "y", "y'", "y2"];
   private static ORIENTATIONS: string[] = ["z", "z'", "z2"];

   private static POPULATION_SIZE: number = 20;
   private static ELITISM_NUM: number = 3;
   private static MAX_GENERATIONS = 1;
   private static MAX_RESETS = 1;

   private _cubes: ThreeByThree[];
   private _initialGeneration: ThreeByThree[];
   private _initialCubeArray: CubeArray;
   private _solved: boolean = false;
   private _scramble: string;

   constructor(scramble: string) {
      const myScramble = scramble.trim().replace(/i/g, "'");
      const cube = new ThreeByThree();
      cube.move(myScramble);

      const cubes = this.sortByScore(
         new Array(Genetic.POPULATION_SIZE).fill(null).map(() => {
            const newCube = new ThreeByThree();

            newCube.move(myScramble);
            newCube.move(cube.getRandomMove());
            newCube.move(cube.getRandomMove());

            return newCube;
         })
      );

      this._scramble = myScramble;

      this._cubes = cubes;
      this._initialGeneration = cubes;

      this._initialCubeArray = cube.cubeArray;

      this._solved = false;
   }

   public get solved(): boolean {
      return this._solved;
   }

   public set solved(v: boolean) {
      this._solved = v;
   }

   public get initialGeneration(): ThreeByThree[] {
      return this._initialGeneration;
   }

   public get initialCubeArray(): CubeArray {
      return this._initialCubeArray;
   }

   public get cubes(): ThreeByThree[] {
      return this._cubes;
   }

   public set cubes(v: ThreeByThree[]) {
      this._cubes = v;
   }

   private resetCubeGeneration() {
      this.cubes = this.initialGeneration;
      this.solved = false;
   }

   private getScore(cubeArray: CubeArray) {
      let misplacedStickers = 0;
      const maxScore = 54;

      for (let face = 0; face < 6; face++) {
         const center = cubeArray[face][4];
         for (let piece = 0; piece < 9; piece++) {
            if (center === cubeArray[face][piece]) {
               misplacedStickers += 1;
            }
         }
      }
      return misplacedStickers;
   }

   private sortByScore(cubes: ThreeByThree[]): ThreeByThree[] {
      return cubes.sort((cubeA, cubeB) => {
         return this.getScore(cubeA.cubeArray) - this.getScore(cubeB.cubeArray);
      });
   }

   private getRandomPermutation(): string {
      const random = Math.floor(Math.random() * Genetic.PERMUTATIONS.length);
      return Genetic.PERMUTATIONS[random];
   }
   private getRandomOrientation(): string {
      const random = Math.floor(Math.random() * Genetic.ORIENTATIONS.length);
      return Genetic.ORIENTATIONS[random];
   }
   private getRandomFullRotation(): string {
      const random = Math.floor(Math.random() * Genetic.FULL_ROTATIONS.length);
      return Genetic.FULL_ROTATIONS[random];
   }

   private solveGeneration(): void {
      let g = 0;
      while (g < Genetic.MAX_GENERATIONS && !this._solved) {
         let cubes = this.sortByScore(this._cubes);
         console.log(
            "AVANT : ",
            cubes.map((cube) => Cube.getColorArray(cube.cubeArray))
         );

         for (let i = 0; i < Genetic.POPULATION_SIZE; i++) {
            if (this.getScore(cubes[i].cubeArray) === 0) {
               console.log("🚀 Cube solved");
               console.log("[SOLUTION] ", cubes[i].geneticMoves);
               console.table(Cube.getColorArray(cubes[i].cubeArray));
               this.solved = true;

               return;
            }
            if (i > Genetic.ELITISM_NUM) {
               const random = Math.floor(Math.random() * Genetic.ELITISM_NUM);

               // ? copy a random top performer cube
               cubes[i] = cubes[random];
               const cube = cubes[i];

               const evolutionType = Math.floor(Math.random() * 6);

               let permutation1 = "";
               let permutation2 = "";
               let fullRotation = "";
               let orientation = "";

               switch (evolutionType) {
                  case 0:
                     permutation1 = this.getRandomPermutation();
                     cube.move(permutation1);
                     cube.geneticMoves = [...cube.geneticMoves, permutation1];
                     break;
                  case 1:
                     permutation1 = this.getRandomPermutation();
                     permutation2 = this.getRandomPermutation();

                     cube.move(permutation1);
                     cube.move(permutation2);

                     cube.geneticMoves = [
                        ...cube.geneticMoves,
                        permutation1,
                        permutation2,
                     ];
                     break;
                  case 2:
                     fullRotation = this.getRandomFullRotation();
                     permutation1 = this.getRandomPermutation();

                     cube.move(fullRotation);
                     cube.move(permutation1);

                     cube.geneticMoves = [
                        ...cube.geneticMoves,
                        fullRotation,
                        permutation1,
                     ];
                     break;
                  case 3:
                     orientation = this.getRandomOrientation();
                     permutation1 = this.getRandomPermutation();

                     cube.move(orientation);
                     cube.move(permutation1);

                     cube.geneticMoves = [
                        ...cube.geneticMoves,
                        orientation,
                        permutation1,
                     ];
                     break;
                  case 4:
                     fullRotation = this.getRandomFullRotation();
                     orientation = this.getRandomOrientation();
                     permutation1 = this.getRandomPermutation();

                     cube.move(fullRotation);
                     cube.move(orientation);
                     cube.move(permutation1);

                     cube.geneticMoves = [
                        ...cube.geneticMoves,
                        fullRotation,
                        orientation,
                        permutation1,
                     ];
                     break;
                  case 5:
                     orientation = this.getRandomOrientation();
                     fullRotation = this.getRandomFullRotation();
                     permutation1 = this.getRandomPermutation();

                     cube.move(orientation);
                     cube.move(fullRotation);
                     cube.move(permutation1);
                     cube.geneticMoves = [
                        ...cube.geneticMoves,
                        orientation,
                        fullRotation,
                        permutation1,
                     ];
                     break;
                  default:
                     break;
               }

               cubes[i] = cube;
            }
         }
         console.log(
            "APRES : ",
            cubes.map((c) => Cube.getColorArray(c.cubeArray))
         );

         cubes = this.sortByScore(cubes);

         const bestScore = this.getScore(cubes[0].cubeArray);

         if (bestScore < 8) {
            console.log(
               "CURRENT SCORES : ",
               cubes.map((cube) => this.getScore(cube.cubeArray))
            );
         }
         g++;
      }
   }
   public solve(): void {
      console.log("🚀 Starting solving... ", this._scramble);
      console.log(
         "INITIAL SCORES : ",
         this.cubes.map((cube) => this.getScore(cube.cubeArray))
      );
      console.table(Cube.getColorArray(this.initialCubeArray));
      let r = 0;
      while (r < Genetic.MAX_RESETS && !this._solved) {
         this.resetCubeGeneration();
         this.solveGeneration();
         r++;
         console.log("🚀 Resetting generation... ", r);
      }
      console.log("🚀 Solving failed");
   }
}

export default Genetic;

