import Canvas from "@components/threejs/canvas";
import { Solver } from "@lib/cubes/Solver";
import React, { FC, useEffect, useState } from "react";
interface IProps {
  solver: Solver;
}

const ThreeDCube: FC<IProps> = ({ solver }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="flex flex-col h-[500px] max-w-full gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold">3D Cube</h2>
      <div className="flex flex-row justify-center gap-x-3 w-full">
        <div className="w-4 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
        <div className="w-9 h-1 bg-gray-900/80 dark:bg-gray-200/60 rounded-full shadow-sm"></div>
      </div>
      {!!mounted && <Canvas cube={solver.cube} />}
    </section>
  );
};

export default ThreeDCube;
