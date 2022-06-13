import CubePattern from "@components/cube-pattern";
import { CubeArray } from "@lib/cubes/types";
import React, { FC, useEffect, useState } from "react";
interface IProps {
  cubeArray: CubeArray;
}
const Pattern: FC<IProps> = ({ cubeArray }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <article className="flex flex-col gap-y-3 py-5 px-5 justify-center items-center w-full lg:w-6/12 h-full bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-500/10 hover:shadow-md duration-150">
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
    </article>
  );
};

export default Pattern;
