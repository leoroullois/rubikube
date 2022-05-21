import {
   Color,
   ColorMapping,
   CubeArray,
   Rubik,
   StateMapping,
} from "@lib/cubes/types";

import { Moves } from "./Moves";

abstract class Cube {
   public abstract rotationFace(face: ColorMapping[]): void;

   public abstract rotationFacePrime(face: ColorMapping[]): void;

   public abstract moveRight(): void;

   public abstract moveRightPrime(): void;

   public abstract moveLeft(): void;

   public abstract moveLeftPrime(): void;

   public abstract moveFront(): void;

   public abstract moveFrontPrime(): void;

   public abstract moveBack(): void;

   public abstract moveBackPrime(): void;

   public abstract moveUp(): void;

   public abstract moveUpPrime(): void;

   public abstract moveDown(): void;

   public abstract moveDownPrime(): void;

   public move(scramble: string) {
      const currentScramble = scramble.split(" ");

      for (const element of currentScramble) {
         switch (element) {
            case Moves.R:
               this.moveRight();
               break;
            case Moves.R2:
               this.moveRight();
               this.moveRight();
               break;
            case Moves.Ri:
               this.moveRightPrime();
               break;

            case Moves.L:
               this.moveLeft();
               break;
            case Moves.L2:
               this.moveLeft();
               this.moveLeft();
               break;
            case Moves.Li:
               this.moveLeftPrime();
               break;

            case Moves.F:
               this.moveFront();
               break;
            case Moves.F2:
               this.moveFront();
               this.moveFront();
               break;
            case Moves.Fi:
               this.moveFrontPrime();
               break;

            case Moves.B:
               this.moveBack();
               break;
            case Moves.B2:
               this.moveBack();
               this.moveBack();
               break;
            case Moves.Bi:
               this.moveBackPrime();
               break;

            case Moves.U:
               this.moveUp();
               break;
            case Moves.U2:
               this.moveUp();
               this.moveUp();
               break;
            case Moves.Ui:
               this.moveUpPrime();
               break;

            case Moves.D:
               this.moveDown();
               break;
            case Moves.D2:
               this.moveDown();
               this.moveDown();
               break;
            case Moves.Di:
               this.moveDownPrime();
               break;
         }
      }
   }
}

export default Cube;

