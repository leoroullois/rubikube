import Head from "next/head";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FcInfo } from "react-icons/fc";
import { IoArrowForward } from "react-icons/io5";

import KbdBtn from "@components/buttons/kbd-btn";
import CubePattern from "@components/cube-pattern";
import BlueText from "@components/texts/blue-text";
import RedText from "@components/texts/red-text";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";
import { Moves } from "@lib/cubes/Moves";
import { Solver } from "@lib/cubes/Solver";
import Test from "@lib/cubes/Test";

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
    setLastSequenceOfMovements("");
    setSequenceOfMovements("");
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

  const [sequenceOfMovements, setSequenceOfMovements] = useState("");
  const [lastSequenceOfMovements, setLastSequenceOfMovements] = useState("");
  const handleChangeSequenceMovements: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    console.log("change");
    e.preventDefault();
    e.stopPropagation();
    setSequenceOfMovements(e.target.value);
  };
  const handleClickSequenceMovements: MouseEventHandler = () => {
    console.log("click");
    solver.cube.scramble += " " + sequenceOfMovements;
    solver.cube.move(sequenceOfMovements);
    setLastSequenceOfMovements(sequenceOfMovements);
    setSequenceOfMovements("");
    setCubeArray(solver.cube.cubeArray);
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
          <section className="flex flex-col max-w-full gap-y-5 p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
            <h2 className="w-full text-center text-xl font-semibold">
              🎮 Moves
            </h2>
            <div className="flex flex-row flex-wrap w-full h-auto gap-y-3 gap-x-3 justify-evenly items-start">
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
          </section>
          <section className="flex flex-col h-[500px] max-w-full gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">3D Cube</h2>
            <div className="flex flex-row justify-center gap-x-3 w-full">
              <div className="w-4 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
              <div className="w-9 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
            </div>
            {!!mounted && <Canvas cube={solver.cube} />}
          </section>
          <section className="flex flex-col justify-center items-center max-w-full gap-y-5 gap-x-5 lg:flex-row">
            <div className="flex flex-col md:flex-row lg:flex-col justify-between h-full w-full lg:w-6/12  gap-5">
              <article className="flex flex-col w-full md:w-1/2 lg:w-full max-w-full h-full gap-y-2 justify-evenly items-start p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
                <h2 className="text-lg font-semibold">💯 Actions</h2>
                <div className="flex flex-row gap-x-3 w-full justify-start">
                  <div className="w-4 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
                  <div className="w-9 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
                </div>
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
                <div className="flex flex-col gap-y-3 w-full">
                  <label htmlFor="algo">Enter a sequence of movements : </label>
                  <div className="flex flex-col lg:flex-row justify-between gap-3 w-full">
                    <input
                      id="sequence-movements"
                      type="text"
                      placeholder="R U R' U'"
                      value={sequenceOfMovements}
                      onChange={handleChangeSequenceMovements}
                      className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring border border-neutral-900/20 outline-none duration-150"
                    />
                    <button
                      onClick={handleClickSequenceMovements}
                      className="px-4 py-2 w-full lg:w-5/12 text-gray-900 bg-indigo-400 hover:bg-indigo-500 active:ring rounded shadow-sm duration-150 text-md font-semibold"
                    >
                      Execute
                      <IoArrowForward className="h-full float-right" />
                    </button>
                  </div>
                  <p>
                    Last sequence :{" "}
                    {lastSequenceOfMovements ? lastSequenceOfMovements : "--"}
                  </p>
                </div>
              </article>
              <article className="flex flex-col w-full md:w-1/2 lg:w-full max-w-full gap-y-5 justify-evenly items-start p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
                <h2 className="flex flew-row items-center gap-x-3 text-lg font-semibold">
                  <FcInfo />
                  <span>Informations</span>
                </h2>
                <div className="flex flex-row gap-x-3 w-full justify-start">
                  <div className="w-4 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
                  <div className="w-9 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
                </div>
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
              <h2 className="text-lg font-semibold w-full text-left">
                🔎 Cube pattern
              </h2>
              <div className="flex flex-row gap-x-3 w-full justify-start">
                <div className="w-4 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
                <div className="w-9 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
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
