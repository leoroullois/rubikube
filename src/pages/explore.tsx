import Head from "next/head";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

import CubePattern from "@components/cube-pattern";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";
import { Moves } from "@lib/cubes/Moves";
import { Solver } from "@lib/cubes/Solver";
import KbdBtn from "@components/buttons/kbd-btn";
import RedText from "@components/texts/red-text";
import BlueText from "@components/texts/blue-text";

const Explore = () => {
  const [mounted, setMounted] = useState(false);
  const [solver] = useState(new Solver());
  const [cubeArray, setCubeArray] = useState(solver.cube.cubeArray);

  const [active, setActive] = useState<Moves | null>(null);
  const [btnGroups] = useState([
    [Moves.R, Moves.Ri],
    [Moves.L, Moves.Li],
    [Moves.F, Moves.Fi],
    [Moves.B, Moves.Bi],
    [Moves.U, Moves.Ui],
    [Moves.D, Moves.Di],
  ]);

  const setActiveBtn = (move: Moves) => {
    setActive(move);
    setTimeout(() => {
      setActive(null);
    }, 300);
  };

  const handleBtn = useCallback(
    (move: Moves) => {
      solver.update(move);
      setCubeArray(solver.cube.cubeArray);
    },
    [solver]
  );

  const handleMove = useCallback(
    (e: KeyboardEvent) => {
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

  const handleScramble: MouseEventHandler = () => {
    console.log("⏰ Scrambling cube...");
    solver.reset();

    solver.cube.randomlyScrambleCube();

    setCubeArray(solver.cube.cubeArray);
    solver.solution = "";

    console.log("❓ New scramble : ", solver.cube.scramble);
  };

  const handleReset: MouseEventHandler = () => {
    solver.reset();
    setCubeArray(solver.cube.cubeArray);
    console.clear();
    console.log("🔴 Cube has been reset");
  };

  const handleSolve: MouseEventHandler = () => {
    console.log("⏰ Solving cube...");

    solver.solve();

    setCubeArray(solver.cube.cubeArray);
    console.log("❓ Scramble : ", solver.cube.scramble);
    console.log("🚀 Solution : ", solver.solution);
    console.log(
      "💪 Solution length : ",
      solver.solution.trim().split(" ").length
    );
  };

  useEffect(() => {
    solver.reset();
    setCubeArray(solver.cube.cubeArray);
    setMounted(true);
  }, [solver]);

  return (
    <>
      <Head>
        <title>Explore - Ruby Cube</title>
      </Head>
      <main className="flex flex-col">
        <Wrapper className="flex flex-col gap-y-5 py-5">
          <h1 className="w-full text-left text-3xl text font-bold">
            🚀 Exploring
          </h1>
          <p className="text-xl font-semibold w-full text-left text-gray-900/80 dark:text-gray-100/90">
            Scramble your cube and watch it in <RedText>3D</RedText>. Then,
            solve it or ask our <BlueText>algorithm</BlueText> to solve it for
            you...
          </p>
          <div className="flex flex-row flex-wrap max-w-full h-auto gap-y-3 gap-x-3 justify-evenly items-start p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
            {btnGroups.map((group) => (
              <div key={group[0]} className="flex w-28 flex-col gap-y-2">
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
          <section className="flex flex-col h-96">
            {!!mounted && <Canvas cube={solver.cube} />}
          </section>
          <section className="flex flex-col justify-center items-center max-w-full gap-y-5 gap-x-5 sm:flex-row">
            <div className="flex flex-col justify-between h-full w-full sm:w-6/12  gap-y-5">
              <article className="flex flex-col max-w-full h-full gap-y-2 justify-evenly items-start p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
                <h3 className="text-lg font-semibold">Actions</h3>
                <p className="text-gray-700 dark:text-gray-400/80">
                  Do what you want with the cube !
                </p>
                <div className="flex flex-row gap-x-3 gap-y-3 justify-between w-full flex-wrap">
                  <button
                    className="flex justify-center items-center p-2 w-28 rounded text-gray-900 bg-green-400 hover:bg-green-500"
                    onClick={handleScramble}
                  >
                    Scramble
                  </button>

                  <button
                    className="flex justify-center items-center p-2 w-28 rounded text-gray-900 bg-blue-400 hover:bg-blue-500"
                    onClick={handleSolve}
                  >
                    Solve
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex justify-center items-center p-2 w-28 rounded text-gray-900 bg-red-400 hover:bg-red-500"
                  >
                    Reset
                  </button>
                </div>
                <div>
                  <label htmlFor="algo">Enter an algorithm</label>
                  <input type="text" placeholder="R U R' U'" />
                  <button>Move</button>
                </div>
              </article>
              <article className="flex flex-col max-w-full gap-y-5 justify-evenly items-start p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
                {mounted && (
                  <>
                    <p>
                      🔥 Scramble :{" "}
                      {solver.cube.scramble ? solver.cube.scramble : "--"}
                    </p>
                    <p>
                      💡 Solution : {solver.solution ? solver.solution : "--"}
                    </p>
                    <p>
                      ❓ Solution length :{" "}
                      {solver.solution
                        ? solver.solution.split(" ").length
                        : "--"}
                    </p>
                  </>
                )}
              </article>
            </div>
            <div className="flex flex-col gap-y-3 py-5 px-5 justify-center items-center w-full lg:w-6/12 h-full bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
              <h3 className="text-lg font-semibold w-full text-left">
                Cube pattern
              </h3>
              <div className="flex flex-row gap-x-3 w-full justify-start">
                <div className="w-4 h-1 bg-gray-900/80 rounded-full shadow-sm"></div>
                <div className="w-9 h-1 bg-gray-900/80 rounded-full shadow-sm"></div>
              </div>
              <div className="scale-75 lg:scale-100">
                {mounted && <CubePattern cubeArray={cubeArray} />}
              </div>
            </div>
          </section>
        </Wrapper>
      </main>
    </>
  );
};

export default Explore;
