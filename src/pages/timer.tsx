import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CubePattern from "@components/cube-pattern";
import Wrapper from "@components/wrapper";
import Scramble from "@lib/cubes/Scramble";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { selectTimer } from "@store/selectors";
import { setCubeArray } from "@store/slices/timer";
import { Moves, Rotations } from "@lib/cubes/Moves";
import { HexColor } from "@lib/cubes/types";
import Genetic from "@lib/cubes/Genetic";
import Cube from "@lib/cubes/Cube";

const Timer = () => {
   const dispatch = useDispatch();
   const { cubeArray } = useSelector(selectTimer);
   const [scramble, setScramble] = useState("");
   
   const handleScramble: MouseEventHandler = (e) => {
      const cube = new ThreeByThree();

      const myScramble = new Scramble();

      cube.move(myScramble.scramble);
      dispatch(setCubeArray(cube.cubeArray));

      setScramble(myScramble.scramble);
   };

   const handleRotate = (rotation: Rotations) => {
      const cube = new ThreeByThree(cubeArray);
      cube.move(rotation);
      dispatch(setCubeArray(cube.cubeArray));
      setScramble((scramble) => scramble + rotation + " ");
   };

   const handleMove = (move: string) => {
      const cube = new ThreeByThree();
      console.log("🚨 [MOVE]", move);
      cube.move(scramble + move);
      dispatch(setCubeArray(cube.cubeArray));
      setScramble((scramble) => scramble + move + " ");
   };

   const handleReset = () => {
      const cube = new ThreeByThree();
      dispatch(setCubeArray(cube.cubeArray));
      setScramble("");
   };

   const handleSolve = () => {
      const genetic = new Genetic(scramble);
      genetic.solve();
   };

   useEffect(() => {
      console.table(Cube.getColorArray(cubeArray));

      const cube = new ThreeByThree();
      cube.move("M");
      console.log(cube.cubeArray);
      console.log(cube.getRubik());
   }, [cubeArray]);

   return (
      <>
         <Head>
            <title>Timer</title>
         </Head>
         <main className='flex flex-col'>
            <Wrapper className='flex flex-col gap-y-5'>
               <h1 className='text-3xl text-center my-5 font-bold'>Timer</h1>
               <CubePattern cubeArray={cubeArray} />
               <>
                  {scramble && <p>Scramble : {scramble.replace(/i/g, "'")}</p>}
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
               <div className='flex gap-x-5'>
                  <section className='flex flex-col gap-y-2'>
                     {Object.values(Rotations).map((rotation, i) => {
                        return (
                           <button
                              onClick={() => handleRotate(rotation)}
                              key={i}
                              className='flex justify-center p-2 w-32 rounded text-gray-900 bg-indigo-400 hover:bg-indigo-500'
                           >
                              Rotate {rotation}
                           </button>
                        );
                     })}
                  </section>
                  <section className='flex flex-row w-full flex-wrap gap-x-2'>
                     {Object.values(Moves).map((move, i) => {
                        return (
                           <button
                              onClick={() =>
                                 handleMove(move.replace(/i/g, "'"))
                              }
                              key={i}
                              className='flex justify-center p-2 w-32 h-10 rounded text-gray-900 bg-indigo-400 hover:bg-indigo-500'
                           >
                              Rotate {move}
                           </button>
                        );
                     })}
                  </section>
               </div>
            </Wrapper>
         </main>
      </>
   );
};

export default Timer;

