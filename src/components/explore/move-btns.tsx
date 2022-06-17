import KbdBtn from "@components/buttons/kbd-btn";
import { Moves } from "@lib/cubes/Moves";
import { Solver } from "@lib/cubes/Solver";
import { CubeArray } from "@lib/cubes/types";
import React, { FC, useCallback, useEffect, useState } from "react";

interface IProps {
  solver: Solver;
  setCubeArray: (cubeArray: CubeArray) => void;
  cubeArray: CubeArray;
}
const MoveBtns: FC<IProps> = ({ solver, setCubeArray, cubeArray }) => {
  const [btnGroups] = useState([
    [Moves.R, Moves.Ri],
    [Moves.L, Moves.Li],
    [Moves.F, Moves.Fi],
    [Moves.B, Moves.Bi],
    [Moves.U, Moves.Ui],
    [Moves.D, Moves.Di],
  ]);
  const handleBtn = useCallback(
    (move: Moves) => {
      solver.update(move);
      setCubeArray(solver.cube.cubeArray);
    },
    [solver, setCubeArray]
  );
  const [active, setActive] = useState<Moves | null>(null);
  const setActiveBtn = (move: Moves) => {
    setActive(move);
    setTimeout(() => {
      setActive(null);
    }, 300);
  };

  const handleMove = useCallback(
    (e: KeyboardEvent) => {
      const elt = e.target as HTMLElement;
      if (elt.id == "sequence-movements") {
        return;
      }
      const { key } = e;
      if (!active) {
        switch (key) {
          case "r":
            setActiveBtn(Moves.R);
            handleBtn(Moves.R);
            break;
          case "R":
            setActiveBtn(Moves.Ri);
            handleBtn(Moves.Ri);
            break;
          case "l":
            setActiveBtn(Moves.L);
            handleBtn(Moves.L);
            break;
          case "L":
            setActiveBtn(Moves.Li);
            handleBtn(Moves.Li);
            break;
          case "f":
            setActiveBtn(Moves.F);
            handleBtn(Moves.F);
            break;
          case "F":
            setActiveBtn(Moves.Fi);
            handleBtn(Moves.Fi);
            break;
          case "b":
            setActiveBtn(Moves.B);
            handleBtn(Moves.B);
            break;
          case "B":
            setActiveBtn(Moves.Bi);
            handleBtn(Moves.Bi);
            break;
          case "u":
            setActiveBtn(Moves.U);
            handleBtn(Moves.U);
            break;
          case "U":
            setActiveBtn(Moves.Ui);
            handleBtn(Moves.Ui);
            break;
          case "d":
            setActiveBtn(Moves.D);
            handleBtn(Moves.D);
            break;
          case "D":
            setActiveBtn(Moves.Di);
            handleBtn(Moves.Di);
            break;
          default:
            setActive(null);
            break;
        }
      }
    },
    [active, handleBtn]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleMove);
    return () => {
      document.removeEventListener("keydown", handleMove);
    };
  }, [handleMove]);

  return (
    <section className="flex flex-col lg:w-2/3 max-w-full gap-y-5 p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
      <h2 className="w-full text-center text-xl font-semibold">🎮 Moves</h2>
      <div className="flex flex-row flex-wrap w-full h-auto gap-y-3 gap-x-3 justify-evenly items-start">
        {btnGroups.map((group) => (
          <div key={group[0]} className="flex w-32 flex-col gap-y-2">
            {group.map((btn) => (
              <KbdBtn
                key={btn}
                kbd={btn}
                active={active}
                handleClick={() => handleBtn(btn)}
                cubeArray={cubeArray}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoveBtns;
