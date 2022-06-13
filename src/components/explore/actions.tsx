import { Solver } from "@lib/cubes/Solver";
import { CubeArray } from "@lib/cubes/types";
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useState,
} from "react";
import { IoArrowForward } from "react-icons/io5";
interface IProps {
  handleScramble: MouseEventHandler;
  handleSolve: MouseEventHandler;
  handleReset: MouseEventHandler;
  solver: Solver;
  setCubeArray: (cubeArray: CubeArray) => void;
  setSequenceOfMovements: (sequenceOfMovements: string) => void;
  setLastSequenceOfMovements: (lastSequenceOfMovements: string) => void;
  sequenceOfMovements: string;
  lastSequenceOfMovements: string;
}
const Actions: FC<IProps> = ({
  handleReset,
  handleScramble,
  handleSolve,
  solver,
  setCubeArray,
  setLastSequenceOfMovements,
  setSequenceOfMovements,
  sequenceOfMovements,
  lastSequenceOfMovements,
}) => {
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
  return (
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
  );
};

export default Actions;
