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

   private getCornerIndex(color1: Color, color2: Color, color3: Color): number {
      const tab = [0, 2, 6, 8, 18, 20, 24, 26];
      for (const number of tab) {
         const piece = this.getPiece(number);
         const tabColor = Object.values(piece);
         if (
            tabColor.includes(color1) &&
            tabColor.includes(color2) &&
            tabColor.includes(color3)
         ) {
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

   public updateF2LCornerPosition(numberCorner: number) {
      switch (numberCorner) {
         case 8:
            this.cube.move("U'");
            this.solution += "U' ";
            break;
         case 26:
            this.cube.move("U2");
            this.solution += "U2 ";
            break;
         case 24:
            this.cube.move("U");
            this.solution += "U ";
            break;
         case 2:
            this.cube.move("L' U L U'");
            this.solution += "L' U L U' ";
            break;
         case 20:
            this.cube.move("L U L' U");
            this.solution += "L U L' U ";
            break;
         case 18:
            this.cube.move("B U B'");
            this.solution += "B U B' ";
            break;

         default:
            break;
      }
   }

   public mapNumberToColor(number: number): string {
      switch (number) {
         case 0:
            return "White";
         case 1:
            return "Orange";
         case 2:
            return "Green";
         case 3:
            return "Red";
         case 4:
            return "Blue";
         case 5:
            return "Yellow";
         default:
            return "Not found";
      }
   }

   public solveF2L(color1: Color, color2: Color, color3: Color): void {
      console.log(
         "✨ Solve F2L",
         this.mapNumberToColor(color1),
         this.mapNumberToColor(color2),
         this.mapNumberToColor(color3)
      );
      let numberCorner = this.getCornerIndex(color1, color2, color3);
      let numberEdge = this.getEdgeIndex(color2, color3);
      console.log("❓ [BEFORE] numberCorner", numberCorner);
      console.log("❓ [BEFORE] numberEdge", numberEdge);

      this.updateF2LCornerPosition(numberCorner);

      numberCorner = this.getCornerIndex(color1, color2, color3);
      numberEdge = this.getEdgeIndex(color2, color3);
      console.log("❓ numberCorner", numberCorner);
      console.log("❓ numberEdge", numberEdge);

      // ? si le coin est sur la pièce 0, on ramène l'arrête à la position 3,7 ou 15 pour retrouver une position connue
      if (numberCorner === 0) {
         switch (numberEdge) {
            case 5:
               this.cube.move("F U F'");
               this.solution += "F U F' ";
               break;
            case 17:
               this.cube.move("U'");
               this.solution += "U' ";
               break;
            case 21:
               this.cube.move("R' U R");
               this.solution += "R' U R ";
               break;
            case 23:
               this.cube.move("L U' L'");
               this.solution += "L U' L' ";
               break;
            case 25:
               this.cube.move("U");
               this.solution += "U ";
               break;

            default:
               break;
         }
      } else if (numberCorner === 6) {
         switch (numberEdge) {
            case 5:
               this.cube.move("L' U' L U");
               this.solution += "L' U' L U ";
               break;
            case 21:
               this.cube.move("R' U R");
               this.solution += "R' U R ";
               break;
            case 23:
               this.cube.move("B' U B U'");
               this.solution += "B' U B U' ";
               break;

            default:
               break;
         }
      }

      numberCorner = this.getCornerIndex(color1, color2, color3);
      numberEdge = this.getEdgeIndex(color2, color3);
      console.log("❓ [AFTER] numberCorner", numberCorner);
      console.log("❓ [AFTER] numberEdge", numberEdge);

      // [numberCorner, numberEdge]
      switch (true) {
         case numberCorner === 6 && numberEdge === 15:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("U R U' R'"); //cas1
                  this.solution += "U R U' R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("U' R U2 R' U F' U' F"); //cas13 fait à la main
                  this.solution += "U' R U2 R' U F' U' F ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("U' R U' R' U R U R'"); //cas16
                  this.solution += "U' R U' R' U R U R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("R U' R' U2 F' U' F"); //cas8
                  this.solution += "R U' R' U2 F' U' F ";
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U2 R' U' R U R'"); //cas17
                  this.solution += "R U2 R' U' R U R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("y' U2 R2 U2 R U R' U R2 y"); //cas24
                  this.solution += "y' U2 R2 U2 R U R' U R2 y ";
               }
            }
            break;
         // case [6, 7]:
         case numberCorner === 6 && numberEdge === 7:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.cube.move("y L' U L U2 y R U R' y2"); //cas7
                  this.solution += "y L' U L U2 y R U R' y2 ";
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.cube.move("U F' U F U' F' U' F"); //cas15 fait à la main
                  this.solution += "U F' U F U' F' U' F ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.cube.move("R' U2 R2 U R2 U R"); //cas14
                  this.solution += "R' U2 R2 U R2 U R ";
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.cube.move("F R' F' R"); //cas2
                  this.solution += "F R' F' R ";
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.cube.move("U2 R2 U2 R' U' R U' R2"); //cas23
                  this.solution += "U2 R2 U2 R' U' R U' R2 ";
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.cube.move("y L' U2 L U L' U' L y'"); //cas18
                  this.solution += "y L' U2 L U L' U' L y' ";
               }
            }
            break;
         // case [6, 17]:
         case numberCorner === 6 && numberEdge === 17:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.cube.move("U' R U2 R' U2 R U' R'"); //cas5
                  this.solution += "U' R U2 R' U2 R U' R' ";
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.cube.move("y' R' U' R y"); //cas9
                  this.solution += "y' R' U' R y ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.cube.move("U' R U R' U R U R'"); //cas12
                  this.solution += "U' R U R' U R U R' ";
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.cube.move("y' U R' U' R U2 R' U R y"); //cas4
                  this.solution += "y' U R' U' R U2 R' U R y ";
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.cube.move("R U' R' U2 R U R'"); //cas21
                  this.solution += "R U' R' U2 R U R' ";
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.cube.move("y' U' R' U2 R U' R' U R y"); //cas20
                  this.solution += "y' U' R' U2 R U' R' U R y ";
               }
            }
            break;
         // case [6, 25]:
         case numberCorner === 6 && numberEdge === 25:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.cube.move("U' R U R' U2 R U' R'"); //cas3
                  this.solution += "U' R U R' U2 R U' R' ";
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.cube.move("U' R U' R' U y' R' U' R y"); //cas11
                  this.solution += "U' R U' R' U y' R' U' R y ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.cube.move("R U R'"); //cas10
                  this.solution += "R U R' ";
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.cube.move("R' F R F'"); //cas6
                  this.solution += "R' F R F' ";
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.cube.move("U R U2 R2 F R F'"); //cas19
                  this.solution += "U R U2 R2 F R F' ";
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.cube.move("y' R' U R U2 R' U' R y"); //cas22
                  this.solution += "y' R' U R U2 R' U' R y ";
               }
            }
            break;
         // case [6, 3]:
         case numberCorner === 6 && numberEdge === 3:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("U' R U' R' U2 R U' R'"); //cas31
                  this.solution += "U' R U' R' U2 R U' R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("U' R U R' U F' U' F"); //cas33
                  this.solution += "U' R U R' U F' U' F ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("U R U R' U2 R U R'"); //cas32
                  this.solution += "U R U R' U2 R U R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("y U2 L' U L U y L U L' y2"); //cas34
                  this.solution += "y U2 L' U L U y L U L' y2 ";
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U R' U' R U R' U' R U R'"); //cas36
                  this.solution += "R U R' U' R U R' U' R U R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("R U' R' U F' U F"); //cas35
                  this.solution += "R U' R' U F' U F ";
               }
            }
            break;
         // case [0, 3]:
         case numberCorner === 0 && numberEdge === 3:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U' R' U' R U R' U2 R U' R'"); //cas37
                  this.solution += "R U' R' U' R U R' U2 R U' R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("R U' R' U' R U' R' U F' U' F"); //cas39
                  this.solution += "R U' R' U' R U' R' U F' U' F ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U R' U2 R U' R' U R U R'"); //cas38
                  this.solution += "R U R' U2 R U' R' U R U R' ";
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.cube.move("R U R' U' R U' R' U2 y' R' U' R y"); //cas40
                  this.solution += "R U R' U' R U' R' U2 y' R' U' R y ";
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.cube.move("R U' R' U y' R' U2 R U2 R' U R y"); //cas41
                  this.solution += "R U' R' U y' R' U2 R U2 R' U R y ";
               }
            }
            break;
         // case [0, 7]:
         case numberCorner === 0 && numberEdge === 7:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.cube.move("y' R' U' R U R' U' R y"); //cas27
                  this.solution += "y' R' U' R U R' U' R y ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.cube.move("y' R' U R U' R' U R y"); //cas30
                  this.solution += "y' R' U R U' R' U R y ";
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.cube.move("U R U' R' U' y L' U L y'"); //cas25
                  this.solution += "U R U' R' U' y L' U L y' ";
               }
            }
            break;
         // case [0, 15]:
         case numberCorner === 0 && numberEdge === 15:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U' R' U R U' R'"); //cas29
                  this.solution += "R U' R' U R U' R' ";
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("R U R' U' R U R'"); //cas28
                  this.solution += "R U R' U' R U R' ";
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.cube.move("y U' L' U L y' U R U' R'"); //cas26
                  this.solution += "y U' L' U L y' U R U' R' ";
               }
            }
            break;

         default:
            console.error(
               "Une erreur s'est produite dans les F2L : coin et/ou arrête non trouvée, il manque des cas."
            );
            break;
      }

      console.log("✨ Ending solve F2L");
   }

   public solveAllF2L(): void {
      console.log("✨ Début des F2L");
      this.solveF2L(Color.White, Color.Red, Color.Blue);
      this.cube.move("y");
      this.solution += "y ";

      this.solveF2L(Color.White, Color.Green, Color.Red);
      this.cube.move("y");
      this.solution += "y ";

      this.solveF2L(Color.White, Color.Orange, Color.Green);
      this.cube.move("y");
      this.solution += "y ";

      this.solveF2L(Color.White, Color.Blue, Color.Orange);
      this.cube.move("y");
      this.solution += "y ";

      console.log("✨ Fin des F2L");
   }

   public solve(): void {
      this.solveWhiteCross();
      this.cube.move("x2");
      this.solution += "x2 ";
      this.solveAllF2L();
   }
}

