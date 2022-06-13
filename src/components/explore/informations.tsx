import { Solver } from "@lib/cubes/Solver";
import React, { FC, useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
interface IProps {
  solver: Solver;
}
const Informations: FC<IProps> = ({ solver }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
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
            🔥 Scramble : {solver.cube.scramble ? solver.cube.scramble : "--"}
          </p>
          <p>💡 Solution : {solver.solution ? solver.solution : "--"}</p>
          <p>
            ❓ Solution length :{" "}
            {solver.solution ? solver.solution.split(" ").length : "--"}
          </p>
        </>
      )}
    </article>
  );
};

export default Informations;
