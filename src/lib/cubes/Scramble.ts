import { Moves } from "./Moves";
const { R, Ri, L, Li, F, Fi, B, Bi, U, Ui, D, Di } = Moves;

class Scramble {
   private _scramble: string;
   constructor(pScramble?: string) {
      this._scramble = pScramble ?? this.generateRandomScramble();
   }

   public get scramble(): string {
      return this._scramble;
   }

   public set scramble(v: string) {
      this._scramble = v;
   }

   public generateRandomScramble() {
      let move = "";
      const nb = Math.floor(
         Math.random() * (Math.floor(30) - Math.ceil(20) + 1) + Math.ceil(20)
      );
      for (let i = 0; i < nb; i++) {
         const movesArray = Object.keys(Moves);
         const a = Math.floor(Math.random() * movesArray.length);
         move = move.concat(movesArray[a], " ");
      }
      return move;
   }

   public inverseScramble(pScramble: string) {
      const currentScramble = pScramble.split(" ");

      for (let i = 0; i < currentScramble.length; i++) {
         switch (currentScramble[i]) {
            case R:
               currentScramble[i] = Ri;
               break;
            case Ri:
               currentScramble[i] = R;
               break;
            case L:
               currentScramble[i] = Li;
               break;
            case Li:
               currentScramble[i] = L;
               break;
            case F:
               currentScramble[i] = Fi;
               break;
            case Fi:
               currentScramble[i] = F;
               break;
            case B:
               currentScramble[i] = F;
               break;
            case Bi:
               currentScramble[i] = B;
               break;
            case U:
               currentScramble[i] = Ui;
               break;
            case Ui:
               currentScramble[i] = U;
               break;
            case D:
               currentScramble[i] = Di;
               break;
            case Di:
               currentScramble[i] = D;
               break;
         }
      }
      const reverseScramble = currentScramble.reverse();
      pScramble = reverseScramble.join(" ");

      return pScramble;
   }
}

export default Scramble;

