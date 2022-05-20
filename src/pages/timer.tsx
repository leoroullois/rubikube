import CubePattern from "@components/cube-pattern";
import { initialCubeArray } from "@lib/cube";

const Timer = () => {
   return (
      <main className='flex flex-col'>
         <h1 className='text-3xl text-center my-5'>Timer</h1>
         <CubePattern cubeArray={initialCubeArray} />
      </main>
   );
};

export default Timer;

