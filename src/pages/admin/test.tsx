import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";

import CubePattern from "@components/cube-pattern";
import Wrapper from "@components/wrapper";
import { Solver } from "@lib/cubes/Solver";
import { Moves, Rotations } from "@lib/cubes/Moves";
import Canvas from "@components/threejs/canvas";
import Cube from "@lib/cubes/Cube";
import Image from "next/image";
import { Color } from "@lib/cubes/types";
import Test from "@lib/cubes/Test";

const AdminTests = () => {
  const [mounted, setMounted] = useState(false);
  const [solver] = useState(new Solver());
  const [cubeArray, setCubeArray] = useState(solver.cube.cubeArray);

  const handleScramble: MouseEventHandler = (e) => {
    console.log("⏰ Scrambling cube...");
    solver.reset();
    solver.cube.randomlyScrambleCube();
    setCubeArray(solver.cube.cubeArray);
    solver.solution = "";

    console.log("❓ New scramble : ", solver.cube.scramble);
  };

  const handleReset = () => {
    solver.reset();
    setCubeArray(solver.cube.cubeArray);
    console.clear();
    console.log("🔴 Cube has been reset");
  };

  const handleSolve = () => {
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
  const handleSolveWhiteCross = () => {
    console.log("⏰ Solving white cross...");

    solver.solveWhiteCross();

    setCubeArray(solver.cube.cubeArray);
    console.log("❓ Scramble : ", solver.cube.scramble);
    console.log("🚀 Solution : ", solver.solution);
    console.log(
      "💪 Solution length : ",
      solver.solution.trim().split(" ").length
    );
  };
  const handleSolveF2L = () => {
    console.log("⏰ Solving F2L...");

    // solver.solveAllF2L();
    solver.solveF2L(Color.White, Color.Red, Color.Blue);

    setCubeArray(solver.cube.cubeArray);
    console.log("❓ Scramble : ", solver.cube.scramble);
    console.log("🚀 Solution : ", solver.solution);
    console.log(
      "💪 Solution length : ",
      solver.solution.trim().split(" ").length
    );
  };

  const handleRotate = (rotation: Rotations) => {
    console.log("🚨 [ROTATION]", rotation);
    solver.cube.move(rotation);
    setCubeArray(solver.cube.cubeArray);
  };

  const handleMove = (move: string) => {
    console.log("🚨 [MOVE]", move);
    solver.cube.move(move);
    setCubeArray(solver.cube.cubeArray);
  };

  const handleLog: MouseEventHandler<HTMLButtonElement> = (e) => {
    const elt = e.target as HTMLElement;
    switch (elt.attributes.getNamedItem("data-log")?.value) {
      case "rubik":
        console.table(solver.cube.getMinimalColorRubik());
        break;
      case "cubeArray":
        console.table(Cube.getColorArray(solver.cube.cubeArray));
      default:
        break;
    }
  };

  // ? TESTS
  const handleTestWhiteCross: MouseEventHandler = () => {
    const test = new Test();
    test.testWhiteCross(1e4);
  };
  const handleTestF2L: MouseEventHandler = () => {
    const test = new Test();
    test.testF2L(1e3);
  };

  const handleTestOLL: MouseEventHandler = () => {
    const test = new Test();
    test.testOLL(10);
  };
  useEffect(() => {
    setMounted(true);
  }, [solver.cube.cubeArray]);

  return (
    <>
      <Head>
        <title>Admin panel</title>
      </Head>
      <main className="flex flex-col">
        <Wrapper className="flex flex-col gap-y-5">
          <h1 className="text-3xl text-center my-5 font-bold">Timer</h1>
          <div>
            <>
              {mounted && (
                <div className="flex">
                  <CubePattern cubeArray={cubeArray} />
                  <div className="flex flex-col h-96">
                    <Canvas cube={solver.cube} />
                  </div>
                </div>
              )}
            </>
            <>
              {mounted && (
                <p>
                  Scramble :{" "}
                  {solver.cube.scramble ? solver.cube.scramble : "No scramble"}
                </p>
              )}
            </>
          </div>

          <h2 className="text-2xl font-bold">Solve cube</h2>
          <div className="flex gap-x-5 gap-y-5 flex-wrap">
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-green-400 hover:bg-green-500"
              onClick={handleScramble}
            >
              Scramble
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-blue-400 hover:bg-blue-500"
              onClick={handleSolveWhiteCross}
            >
              Solve white cross
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-blue-400 hover:bg-blue-500"
              onClick={handleSolveF2L}
            >
              Solve first F2L
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-blue-400 hover:bg-blue-500"
              onClick={handleSolve}
            >
              Solve cube
            </button>
            <button
              onClick={handleReset}
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-red-400 hover:bg-red-500"
            >
              Reset
            </button>
          </div>
          <h2 className="text-2xl font-bold">Tests and Debug</h2>
          <div className="flex gap-x-5 gap-y-5 flex-wrap">
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-pink-400 hover:bg-pink-500"
              data-log="rubik"
              onClick={handleLog}
            >
              Log Rubik pieces
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-pink-400 hover:bg-pink-500"
              data-log="cubeArray"
              onClick={handleLog}
            >
              Log cube array
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-pink-400 hover:bg-pink-500"
              data-log="cubeArray"
              onClick={handleTestWhiteCross}
            >
              Test White Cross
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-pink-400 hover:bg-pink-500"
              data-log="cubeArray"
              onClick={handleTestF2L}
            >
              Test F2L
            </button>
            <button
              className="flex justify-center items-center p-2 w-28 h-16 rounded text-gray-900 bg-pink-400 hover:bg-pink-500"
              data-log="cubeArray"
              onClick={handleTestOLL}
            >
              Test OLL
            </button>
          </div>
          <h2 className="text-2xl font-bold">Moves and rotations</h2>
          <div className="flex gap-x-5">
            <section className="flex flex-col gap-y-2">
              {Object.values(Rotations).map((rotation, i) => {
                return (
                  <button
                    onClick={() => handleRotate(rotation)}
                    key={i}
                    className="flex justify-center p-2 w-28 rounded text-gray-900 bg-orange-400 hover:bg-orange-500"
                  >
                    Rotate {rotation}
                  </button>
                );
              })}
            </section>
            <section className="flex flex-row w-96 flex-wrap gap-x-5">
              {Object.values(Moves).map((move, i) => {
                return (
                  <button
                    onClick={() => handleMove(move.replace(/i/g, "'"))}
                    key={i}
                    className="flex justify-center p-2 w-28 h-10 rounded text-gray-900 bg-indigo-400 hover:bg-indigo-500"
                  >
                    Rotate {move}
                  </button>
                );
              })}
            </section>
          </div>
          <div>
            <Image
              src="/cube_modelisation.png"
              alt="Modélisation du cube"
              width={231 * 3}
              height={409 * 3}
            />
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default AdminTests;
