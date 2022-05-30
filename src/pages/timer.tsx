import CubePattern from "@components/cube-pattern";
import Wrapper from "@components/wrapper";
import Scramble from "@lib/cubes/Scramble";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { selectCube, selectTimer } from "@store/selectors";
import { setCubeArray } from "@store/slices/timer";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Timer = () => {
   const dispatch = useDispatch();
   const { cubeArray } = useSelector(selectTimer);
   const [scramble, setScramble] = useState("");
   const handleScramble: MouseEventHandler = (e) => {
      const cube = new ThreeByThree();
      const scramble = new Scramble();
      setScramble(scramble.scramble);

      cube.move(scramble.scramble);
      dispatch(setCubeArray(cube.cubeArray));
   };
   return (
      <>
         <Head>
            <title>Timer</title>
         </Head>
         <main className='flex flex-col'>
            <Wrapper className='flex flex-col gap-y-5'>
               <h1 className='text-3xl text-center my-5 font-bold'>Timer</h1>
               <CubePattern cubeArray={cubeArray} />
               <p>Scramble : {scramble.replace(/i/g, "'")}</p>
               <button
                  className='flex justify-center p-2 w-32 rounded text-gray-900 bg-green-400 hover:bg-green-500'
                  onClick={handleScramble}
               >
                  Scramble cube
               </button>
            </Wrapper>
         </main>
      </>
   );
};

export default Timer;

