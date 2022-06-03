import { Color, IPieceState } from "./types";
import { ThreeByThree } from "./ThreeByThree";
import Scramble from "./Scramble";

export class Solver {
   private _cube: ThreeByThree;
   private _solution: string;

   public constructor() {
      const scramble = new Scramble().scramble;
      this._cube = new ThreeByThree();
      this._cube.cubeArray = this._cube.solvedCubeArray;
      this._cube.move(scramble);

      this._solution = "";
   }

   public get cube(): ThreeByThree {
      return this._cube;
   }

   public set cube(v: ThreeByThree) {
      this._cube = v;
   }

   public get solution(): string {
      return this._solution;
   }

   public set solution(v: string) {
      this._solution = v;
   }

   private getPiece(number: number): IPieceState<Color> {
      const rubik: any = this.cube.getRubik();
      return rubik[number];
   }

   private getEdgeIndex(color1: Color, color2: Color): number {
      const tab = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
      for (const number of tab) {
         const piece = this.getPiece(number);
         const tabColor = Object.values(piece);
         if (tabColor.includes(color1) && tabColor.includes(color2)) {
            return number;
         }
      }
      return -1;
   }

   private solveWhiteEdge(color1: Color, color2: Color): void {
      const number = this.getEdgeIndex(color1, color2);
      switch (number) {
         case 1:
            if (this.getPiece(number)[5] == Color.White) {
               this.cube.move("F2");
               this.solution += "F2 ";
            } else {
               this.cube.move("D L' F L");
               this.solution += "D L' F L ";
            }
            break;
         case 3:
            if (this.getPiece(number)[1] == Color.White) {
               this.cube.move("F'");
               this.solution += "F' ";
            } else {
               this.cube.move("U' R U");
               this.solution += "U' R U ";
            }
            break;
         case 5:
            if (this.getPiece(number)[4] == Color.White) {
               this.cube.move("F");
               this.solution += "F ";
            } else {
               this.cube.move("U L' U'");
               this.solution += "U L' U' ";
            }
            break;
         case 7:
            if (!(this.getPiece(number)[2] == Color.White)) {
               this.cube.move("F U' R U");
               this.solution += "F U' R U ";
            }
            break;
         case 9:
            if (this.getPiece(number)[1] == Color.White) {
               this.cube.move("R F' R'");
               this.solution += "R F' R' ";
            } else {
               this.cube.move("D' F2");
               this.solution += "D' F2 ";
            }
            break;
         case 11:
            if (this.getPiece(number)[4] == Color.White) {
               this.cube.move("L' F L");
               this.solution += "L' F L ";
            } else {
               this.cube.move("D F2");
               this.solution += "D F2 ";
            }
            break;
         case 15:
            if (this.getPiece(number)[1] == Color.White) {
               this.cube.move("R' F'");
               this.solution += "R' F' ";
            } else {
               this.cube.move("R' U' R U");
               this.solution += "R' U' R U ";
            }
            break;
         case 17:
            if (this.getPiece(number)[4] == Color.White) {
               this.cube.move("L F");
               this.solution += "L F ";
            } else {
               this.cube.move("L U L' U'");
               this.solution += "L U L' U' ";
            }
            break;
         case 19:
            if (this.getPiece(number)[5] == Color.White) {
               this.cube.move("D2 F2");
               this.solution += "D2 F2 ";
            } else {
               this.cube.move("D' R F' R'");
               this.solution += "D' R F' R' ";
            }
            break;
         case 21:
            if (this.getPiece(number)[3] == Color.White) {
               this.cube.move("R D' F2 R'");
               this.solution += "R D' F2 R' ";
            } else {
               this.cube.move("U2 B U2");
               this.solution += "U2 B U2 ";
            }
            break;
         case 23:
            if (this.getPiece(number)[3] == Color.White) {
               this.cube.move("L' D F2 L");
               this.solution += "L' D F2 L ";
            } else {
               this.cube.move("U2 B' U2");
               this.solution += "U2 B' U2 ";
            }
            break;
         case 25:
            if (this.getPiece(number)[3] == Color.White) {
               this.cube.move("B' U' R' U");
               this.solution += "B' U' R' U ";
            } else {
               this.cube.move("B U2 B' U2");
               this.solution += "B U2 B' U2 ";
            }
            break;

         default:
            console.error("Une erreur s'est produite");
            break;
      }
   }

   public solveWhiteCross(): void {
      this.solveWhiteEdge(Color.White, Color.Green);
      this.cube.move("y");
      this.solution += "y ";

      this.solveWhiteEdge(Color.White, Color.Red);
      this.cube.move("y");
      this.solution += "y ";

      this.solveWhiteEdge(Color.White, Color.Blue);
      this.cube.move("y");
      this.solution += "y ";

      this.solveWhiteEdge(Color.White, Color.Orange);
      this.cube.move("y");
      this.solution += "y ";
   }

   public solve(): void {
      this.solveWhiteCross();
   }
}

