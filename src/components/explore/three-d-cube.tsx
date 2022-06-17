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
    <section className="flex flex-col w-full lg:w-1/2 max-w-full gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
      {!!mounted && <Canvas cube={solver.cube} />}
    </section>
  );
};

export default ThreeDCube;
