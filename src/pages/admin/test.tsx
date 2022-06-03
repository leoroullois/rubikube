import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";

import CubePattern from "@components/cube-pattern";
import Wrapper from "@components/wrapper";
import { Solver } from "@lib/cubes/Solver";

const AdminTests = () => {
   const [mounted, setMounted] = useState(false);
   const [solver] = useState(new Solver());
   const [cubeArray, setCubeArray] = useState(solver.cube.cubeArray);

   const handleScramble: MouseEventHandler = (e) => {
      console.log("Scramble Cube");

      solver.cube.randomlyScrambleCube();
      setCubeArray(solver.cube.cubeArray);
      solver.solution = "";

      console.log("New scramble : ", solver.cube.scramble);
   };

   const handleReset = () => {
      console.log("Reset cube");

      solver.cube.resetCubeArray();
      setCubeArray(solver.cube.cubeArray);

      solver.solution = "";
   };

   const handleSolve = () => {
      console.log("Solve cube");

      solver.solve();

      setCubeArray(solver.cube.cubeArray);
      console.log("Scramble : ", solver.cube.scramble);
      console.log("Solution : ", solver.solution);
      console.log("Solution length : ", solver.solution.length);
   };

   useEffect(() => {
      setMounted(true);
   }, [solver.cube.cubeArray]);

   return (
      <>
         <Head>
            <title>Timer</title>
         </Head>
         <main className='flex flex-col'>
            <Wrapper className='flex flex-col gap-y-5'>
               <h1 className='text-3xl text-center my-5 font-bold'>Timer</h1>
               <>{mounted && <CubePattern cubeArray={cubeArray} />}</>
               <>
                  {mounted && (
                     <p>
                        Scramble :{" "}
                        {solver.cube.scramble
                           ? solver.cube.scramble
                           : "No scramble"}
                     </p>
                  )}
               </>
               <button
                  className='flex justify-center p-2 w-32 rounded text-gray-900 bg-green-400 hover:bg-green-500'
                  onClick={handleScramble}
               >
                  Scramble
               </button>
               <button
                  className='flex justify-center p-2 w-32 rounded text-gray-900 bg-blue-400 hover:bg-blue-500'
                  onClick={handleSolve}
               >
                  Solve
               </button>
               <button
                  onClick={handleReset}
                  className='flex justify-center p-2 w-32 rounded text-gray-900 bg-red-400 hover:bg-red-500'
               >
                  Reset
               </button>
            </Wrapper>
         </main>
      </>
   );
};

export default AdminTests;

