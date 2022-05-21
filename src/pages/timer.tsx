import CubePattern from "@components/cube-pattern";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { MouseEventHandler, useEffect, useState } from "react";

const Timer = () => {
   const [cube, setCube] = useState(new ThreeByThree());
   const handleScramble: MouseEventHandler = (e) => {
      cube.move("R");
      setCube(cube);
   };
   return (
      <main className='flex flex-col'>
         <h1 className='text-3xl text-center my-5'>Timer</h1>
         <CubePattern cubeArray={cube.cubeArray} />
         <button
            className='flex justify-center p-5 w-52 text-gray-900 bg-green-400 hover:bg-green-500'
            onClick={handleScramble}
         >
            Scramble cube
         </button>
      </main>
   );
};

export default Timer;

