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
import Actions from "@components/explore/actions";
import Informations from "@components/explore/informations";
import MoveBtns from "@components/explore/move-btns";
import ThreeDCube from "@components/explore/three-d-cube";
import BlueText from "@components/texts/blue-text";
import RedText from "@components/texts/red-text";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";
import { Moves } from "@lib/cubes/Moves";
import { Solver } from "@lib/cubes/Solver";

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
          <section className="flex flex-col lg:flex-row w-full gap-x-3 gap-y-5">
            <MoveBtns
              solver={solver}
              setCubeArray={setCubeArray}
              cubeArray={cubeArray}
            />
            <Informations solver={solver} />
          </section>
          <section className="flex flex-col lg:flex-row w-full gap-x-3 gap-y-3">
            <ThreeDCube solver={solver} />
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
          </section>
        </Wrapper>
      </main>
    </>
  );
};

export default Explore;
