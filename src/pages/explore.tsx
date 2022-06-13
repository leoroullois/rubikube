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

import CubePattern from "@components/cube-pattern";
import BlueText from "@components/texts/blue-text";
import RedText from "@components/texts/red-text";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";
import { Moves } from "@lib/cubes/Moves";
import { Solver } from "@lib/cubes/Solver";
import MoveBtns from "@components/explore/move-btns";
import ThreeDCube from "@components/explore/three-d-cube";
import Actions from "@components/explore/actions";
import Informations from "@components/explore/informations";
import Pattern from "@components/explore/pattern";
const Explore = () => {
  const [solver] = useState(new Solver());
  const [cubeArray, setCubeArray] = useState(solver.cube.cubeArray);

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
  const [sequenceOfMovements, setSequenceOfMovements] = useState("");
  const [lastSequenceOfMovements, setLastSequenceOfMovements] = useState("");

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
          <MoveBtns
            solver={solver}
            setCubeArray={setCubeArray}
            cubeArray={cubeArray}
          />
          <ThreeDCube solver={solver} />
          <section className="flex flex-col justify-center items-center max-w-full gap-y-5 gap-x-5 lg:flex-row">
            <div className="flex flex-col md:flex-row lg:flex-col justify-between h-full w-full lg:w-6/12  gap-5">
              <Actions
                handleReset={handleReset}
                handleScramble={handleScramble}
                handleSolve={handleSolve}
                solver={solver}
                setCubeArray={setCubeArray}
                setLastSequenceOfMovements={setLastSequenceOfMovements}
                setSequenceOfMovements={setSequenceOfMovements}
                sequenceOfMovements={sequenceOfMovements}
                lastSequenceOfMovements={lastSequenceOfMovements}
              />
              <Informations solver={solver} />
            </div>
            <Pattern cubeArray={cubeArray} />
          </section>
        </Wrapper>
      </main>
    </>
  );
};

export default Explore;
