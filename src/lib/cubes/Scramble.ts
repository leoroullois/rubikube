import { Moves } from "@lib/cubes/Moves";
const { R, Ri, L, Li, F, Fi, B, Bi, U, Ui, D, Di } = Moves;

class Scramble {
  private _scramble: string;
  constructor(pScramble?: string) {
    this._scramble =
      pScramble?.trim().replace(/i/g, "'") ??
      this.generateRandomScramble().trim().replace(/i/g, "'");
  }

  public get scramble(): string {
    return this._scramble;
  }

  public set scramble(v: string) {
    this._scramble = v;
  }

  public generateRandomScramble() {
    let move = "";
    const min = 15;
    const max = 20;
    const nb = Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
    );
    let lastLetter = "";
    const movesArray = Object.keys(Moves);
    for (let i = 0; i < nb; i++) {
      let a = Math.floor(Math.random() * movesArray.length);
      while (
        movesArray[a][0] === lastLetter ||
        movesArray[a] === Moves.M ||
        movesArray[a] === Moves.M2 ||
        movesArray[a] === "Mi" ||
        movesArray[a] === "M'"
      ) {
        a = Math.floor(Math.random() * movesArray.length);
      }
      move = move.concat(movesArray[a], " ");
      lastLetter = movesArray[a][0];
    }
    return move.replace(/,/g, " ").replace(/i/g, "'");
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
