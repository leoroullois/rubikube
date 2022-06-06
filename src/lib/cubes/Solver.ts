import { Color, IPieceState } from "./types";
import { ThreeByThree } from "./ThreeByThree";
import Scramble from "./Scramble";

export class Solver {
   private _cube: ThreeByThree;
   private _solution: string;
   private _verbose: boolean;
   public constructor() {
      const scramble = new Scramble().scramble;
      this._cube = new ThreeByThree();
      this._cube.cubeArray = this._cube.solvedCubeArray;
      this._cube.move(scramble);

      this._solution = "";
      this._verbose = false;
   }

   public get verbose(): boolean {
      return this._verbose;
   }

   public set verbose(v: boolean) {
      this._verbose = v;
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

   private update(move: string) {
      this.cube.move(move);
      this.solution += move + " ";
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
               this.update("F2");
            } else {
               this.update("D R F' R'");
            }
            break;
         case 3:
            if (this.getPiece(number)[1] == Color.White) {
               this.update("F'");
            } else {
               this.update("U' R U");
            }
            break;
         case 5:
            if (this.getPiece(number)[4] == Color.White) {
               this.update("F");
            } else {
               this.update("U L' U'");
            }
            break;
         case 7:
            if (!(this.getPiece(number)[2] == Color.White)) {
               this.update("F U' R U");
            }
            break;
         case 9:
            if (this.getPiece(number)[1] == Color.White) {
               this.update("R F' R'");
            } else {
               this.update("D' F2");
            }
            break;
         case 11:
            if (this.getPiece(number)[4] == Color.White) {
               this.update("L' F L");
            } else {
               this.update("D F2");
            }
            break;
         case 15:
            if (this.getPiece(number)[1] == Color.White) {
               this.update("R' F'");
            } else {
               this.update("R' U' R U");
            }
            break;
         case 17:
            if (this.getPiece(number)[4] == Color.White) {
               this.update("L F");
            } else {
               this.update("L U L' U'");
            }
            break;
         case 19:
            if (this.getPiece(number)[5] == Color.White) {
               this.update("D2 F2");
            } else {
               this.update("D' R F' R'");
            }
            break;
         case 21:
            if (this.getPiece(number)[3] == Color.White) {
               this.update("R D' F2 R'");
            } else {
               this.update("U2 B U2");
            }
            break;
         case 23:
            if (this.getPiece(number)[3] == Color.White) {
               this.update("L' D F2 L");
            } else {
               this.update("U2 B' U2");
            }
            break;
         case 25:
            if (this.getPiece(number)[3] == Color.White) {
               this.update("B' U' R' U");
            } else {
               this.update("B U2 B' U2");
            }
            break;

         default:
            console.error("Une erreur s'est produite, edgeIndex :", number);
            break;
      }
   }

   public solveWhiteCross(): void {
      this.solveWhiteEdge(Color.White, Color.Green);
      this.update("y");

      this.solveWhiteEdge(Color.White, Color.Red);
      this.update("y");

      this.solveWhiteEdge(Color.White, Color.Blue);
      this.update("y");

      this.solveWhiteEdge(Color.White, Color.Orange);
      this.update("y");
   }

   private updateF2LCornerPosition(numberCorner: number) {
      switch (numberCorner) {
         case 8:
            this.update("U'");
            break;
         case 26:
            this.update("U2");
            break;
         case 24:
            this.update("U");
            break;
         case 2:
            this.update("L' U L U'");
            break;
         case 20:
            this.update("L U L' U");
            break;
         case 18:
            this.update("B U B'");
            break;
         default:
            break;
      }
   }

   private updateF2LEdgePosition(numberCorner: number, numberEdge: number) {
      if (numberCorner === 0) {
         this.verbose && console.log("🚨", numberCorner, numberEdge);
         switch (numberEdge) {
            case 5:
               this.update("F U' F'");
               break;
            case 17:
               this.update("U'");
               break;
            case 21:
               this.update("R' U R");
               break;
            case 23:
               this.update("L U' L'");
               break;
            case 25:
               this.update("U");
               break;

            default:
               break;
         }
      } else if (numberCorner === 6) {
         this.verbose && console.log("🚨", numberCorner, numberEdge);
         switch (numberEdge) {
            case 5:
               this.update("L' U' L U");
               break;
            case 21:
               this.update("R' U R");
               break;
            case 23:
               this.update("B' U B U'");
               break;

            default:
               break;
         }
      } else {
         console.error("Le coin n'est pas bien placé", numberCorner);
      }
   }

   public solveF2L(color1: Color, color2: Color, color3: Color): void {
      this.verbose &&
         console.log(
            "✨ Solve F2L",
            this.mapNumberToColor(color1),
            this.mapNumberToColor(color2),
            this.mapNumberToColor(color3)
         );
      let numberCorner = this.getCornerIndex(color1, color2, color3);
      let numberEdge = this.getEdgeIndex(color2, color3);
      this.verbose && console.log("❓ [BEFORE] numberCorner", numberCorner);
      this.verbose && console.log("❓ [BEFORE] numberEdge", numberEdge);

      this.updateF2LCornerPosition(numberCorner);

      numberCorner = this.getCornerIndex(color1, color2, color3);
      numberEdge = this.getEdgeIndex(color2, color3);
      this.verbose &&
         console.log("❓[CORNER FIXED] numberCorner", numberCorner);
      this.verbose && console.log("❓ [CORNER FIXED] numberEdge", numberEdge);

      this.updateF2LEdgePosition(numberCorner, numberEdge);

      numberCorner = this.getCornerIndex(color1, color2, color3);
      numberEdge = this.getEdgeIndex(color2, color3);
      this.verbose && console.log("❓ [FINAL] numberCorner", numberCorner);
      this.verbose && console.log("❓ [FINAL] numberEdge", numberEdge);

      switch (true) {
         case numberCorner === 6 && numberEdge === 15:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("U R U' R'"); //cas1
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("U' R U2 R' U F' U' F"); //cas13 fait à la main
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("U' R U' R' U R U R'"); //cas16
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("R U' R' U2 F' U' F"); //cas8
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U2 R' U' R U R'"); //cas17
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("y' U2 R2 U2 R U R' U R2 y"); //cas24
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 6 && numberEdge === 7:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.update("y L' U L U2 y' R U R'"); //cas7
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.update("U F' U F U' F' U' F"); //cas15 fait à la main
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.update("R' U2 R2 U R2 U R"); //cas14
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.update("F R' F' R"); //cas2
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.update("U2 R2 U2 R' U' R U' R2"); //cas23
               } else if (this.getPiece(numberEdge)[0] == color3) {
                  this.update("y L' U2 L U L' U' L y'"); //cas18
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 6 && numberEdge === 17:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.update("U' R U2 R' U2 R U' R'"); //cas5
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.update("y' R' U' R y"); //cas9
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.update("U' R U R' U R U R'"); //cas12
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.update("y' U R' U' R U2 R' U R y"); //cas4
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[4] == color2) {
                  this.update("R U' R' U2 R U R'"); //cas21
               } else if (this.getPiece(numberEdge)[4] == color3) {
                  this.update("y' U' R' U2 R U' R' U R y"); //cas20
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 6 && numberEdge === 25:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.update("U' R U R' U2 R U' R'"); //cas3
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.update("U' R U' R' U y' R' U' R y"); //cas11
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.update("R U R'"); //cas10
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.update("U F' U2 F U2 F' U F"); //cas6
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[3] == color2) {
                  this.update("U R U2 R2 F R F'"); //cas19
               } else if (this.getPiece(numberEdge)[3] == color3) {
                  this.update("y' R' U R U2 R' U' R y"); //cas22
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 6 && numberEdge === 3:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("U' R U' R' U2 R U' R'"); //cas31
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("U' R U R' U F' U' F"); //cas33
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("U R U R' U2 R U R'"); //cas32
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("y U2 L' U L U y L U L' y2"); //cas34
               }
            } else if (this.getPiece(numberCorner)[2] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U R' U' R U R' U' R U R'"); //cas36
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("R U' R' U F' U F"); //cas35
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 0 && numberEdge === 3:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U' R' U' R U R' U2 R U' R'"); //cas37
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("R U' R' U' R U' R' U F' U' F"); //cas39
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U R' U2 R U' R' U R U R'"); //cas38
               } else if (this.getPiece(numberEdge)[1] == color3) {
                  this.update("R U R' U' R U' R' U2 y' R' U' R y"); //cas40
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[0] == color2) {
                  this.update("R U' R' U y' R' U2 R U2 R' U R y"); //cas41
               } else if (this.getPiece(numberEdge)[0] === color3) {
                  this.verbose && console.log("This F2L is already solved !"); //cas41 bis
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 0 && numberEdge === 7:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.update("y' R' U' R U R' U' R y"); //cas27
               } else if (this.getPiece(numberEdge)[2] === color3) {
                  this.update("U' R U' R' U R U' R'"); //cas27 bis
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.update("y' R' U R U' R' U R y"); //cas30
               } else if (this.getPiece(numberEdge)[2] === color3) {
                  this.update("U2 R U2 R' U2 R U R'"); //cas30 bis
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[2] == color2) {
                  this.update("U R U' R' U' y L' U L y'"); //cas25
               } else if (this.getPiece(numberEdge)[2] === color3) {
                  this.update("U2 F' U' F U R U R'"); //cas25 bis
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;
         case numberCorner === 0 && numberEdge === 15:
            if (this.getPiece(numberCorner)[0] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U' R' U R U' R'"); //cas29
               } else if (this.getPiece(numberEdge)[1] === color3) {
                  this.update("U F' U' F U F' U' F"); //cas29 bis
               }
            } else if (this.getPiece(numberCorner)[1] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("R U R' U' R U R'"); //cas28
               } else if (this.getPiece(numberEdge)[1] === color3) {
                  this.update("U R U R' U2 F' U F"); //cas28 bis
               }
            } else if (this.getPiece(numberCorner)[5] == Color.White) {
               if (this.getPiece(numberEdge)[1] == color2) {
                  this.update("y U' L' U L y' U R U' R'"); //cas26
               } else if (this.getPiece(numberEdge)[1] === color3) {
                  this.update("U2 R U R' U' F' U' F"); //cas26 bis
               }
            } else {
               console.error(
                  "No solution found",
                  numberCorner,
                  numberEdge,
                  this.mapNumberToColor(color1),
                  this.mapNumberToColor(color2)
               );
            }
            break;

         default:
            console.error(
               "Une erreur s'est produite dans les F2L : coin et/ou arrête non trouvée, il manque des cas."
            );
            break;
      }

      this.verbose && console.log("✨ Ending solve F2L");
   }

   public solveAllF2L(): void {
      this.verbose && console.log("✨ Début des F2L");
      this.solveF2L(Color.White, Color.Red, Color.Blue);
      this.update("y");

      this.solveF2L(Color.White, Color.Green, Color.Red);
      this.update("y");

      this.solveF2L(Color.White, Color.Orange, Color.Green);
      this.update("y");

      this.solveF2L(Color.White, Color.Blue, Color.Orange);
      this.update("y");

      this.verbose && console.log("✨ Fin des F2L");
   }

   public solve(): void {
      this.solveWhiteCross();
      this.update("x2");
      this.solveAllF2L();
   }
}

