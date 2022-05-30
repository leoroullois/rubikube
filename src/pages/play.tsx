import KbdBtn from "@components/buttons/kbd-btn";
import Wrapper from "@components/wrapper";
import { selectCube } from "@store/selectors";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Canvas from "@components/threejs/canvas";
import {
   makeRotateGroup,
   resetCurrRotate,
   setCurrMove,
} from "@store/slices/cube";
import { Moves } from "@lib/cubes/Moves";

const Play = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const [btnGroups] = useState([
      [Moves.R, Moves.Ri],
      [Moves.L, Moves.Li],
      [Moves.F, Moves.Fi],
      [Moves.B, Moves.Bi],
      [Moves.U, Moves.Ui],
      [Moves.D, Moves.Di],
   ]);
   return (
      <>
         <Head>
            <title>Play with AI</title>
         </Head>
         <main className='flex flex-col'>
            <Wrapper className='flex-col'>
               <section>
                  <div className='flex justify-center py-5 gap-x-5'>
                     {btnGroups.map((group) => (
                        <div key={group[0]} className='flex flex-col gap-y-2'>
                           {group.map((btn) => (
                              <KbdBtn key={btn} kbd={btn} />
                           ))}
                        </div>
                     ))}
                  </div>
               </section>
            </Wrapper>
            <>{mounted && <Canvas />}</>
         </main>
      </>
   );
};

export default Play;

