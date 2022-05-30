import KbdBtn from "@components/buttons/kbd-btn";
import Wrapper from "@components/wrapper";
import { selectCube } from "@store/selectors";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Canvas from "@components/threejs/canvas";

const Play = () => {
   const [mounted, setMounted] = useState(false);
   useEffect(() => {
      setMounted(true);
   }, []);
   const handleClick: MouseEventHandler = (e) => {
      console.log(e);
   };

   return (
      <>
         <Head>
            <title>Play with AI</title>
         </Head>
         <main className='flex flex-col'>
            <Wrapper className='flex-col'>
               <section>
                  <div className='flex gap-x-5'>
                     <div className='flex flex-col gap-y-2'>
                        <KbdBtn kbd='L'>Left</KbdBtn>
                        <KbdBtn kbd='L2'>Left</KbdBtn>
                        <KbdBtn kbd="L'">Left</KbdBtn>
                     </div>
                     <div className='flex flex-col gap-y-2'>
                        <KbdBtn kbd='R'>Right</KbdBtn>
                        <KbdBtn kbd='R2'>Right</KbdBtn>
                        <KbdBtn kbd="R'">Right</KbdBtn>
                     </div>
                  </div>
               </section>
            </Wrapper>
            <>{mounted && <Canvas />}</>
         </main>
      </>
   );
};

export default Play;

