import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import KbdBtn from "@components/buttons/kbd-btn";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";
import { Moves } from "@lib/cubes/Moves";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";

const Play = () => {
   const [mounted, setMounted] = useState(false);

   const [cube] = useState(new ThreeByThree());

   const [active, setActive] = useState<Moves | null>(null);
   const [btnGroups] = useState([
      [Moves.R, Moves.Ri],
      [Moves.L, Moves.Li],
      [Moves.F, Moves.Fi],
      [Moves.B, Moves.Bi],
      [Moves.U, Moves.Ui],
      [Moves.D, Moves.Di],
   ]);

   const setActiveBtn = (move: Moves) => {
      setActive(move);
      setTimeout(() => {
         setActive(null);
      }, 500);
   };

   const handleMove = useCallback((e: KeyboardEvent) => {
      const { key } = e;
      switch (key) {
         case "r":
            setActiveBtn(Moves.R);
            break;
         case "R":
            setActiveBtn(Moves.Ri);
            break;
         case "l":
            setActiveBtn(Moves.L);
            break;
         case "L":
            setActiveBtn(Moves.Li);
            break;
         case "f":
            setActiveBtn(Moves.F);
            break;
         case "F":
            setActiveBtn(Moves.Fi);
            break;
         case "b":
            setActiveBtn(Moves.B);
            break;
         case "B":
            setActiveBtn(Moves.Bi);
            break;
         case "u":
            setActiveBtn(Moves.U);
            break;
         case "U":
            setActiveBtn(Moves.Ui);
            break;
         case "d":
            setActiveBtn(Moves.D);
            break;
         case "D":
            setActiveBtn(Moves.Di);
            break;
         default:
            setActive(null);
            break;
      }
   }, []);

   useEffect(() => {
      setMounted(true);

      document.addEventListener("keydown", handleMove);
      return () => {
         document.removeEventListener("keydown", handleMove);
      };
   }, [handleMove]);
   return (
      <>
         <Head>
            <title>Play with AI</title>
         </Head>
         <main className='flex flex-col border-none shadow-none'>
            <Wrapper className='flex-col'>
               <section>
                  <div className='flex justify-center py-5 gap-x-5'>
                     {btnGroups.map((group) => (
                        <div key={group[0]} className='flex flex-col gap-y-2'>
                           {group.map((btn) => (
                              <KbdBtn key={btn} kbd={btn} active={active} />
                           ))}
                        </div>
                     ))}
                  </div>
               </section>
            </Wrapper>
            <>{mounted && <Canvas cube={cube} />}</>
         </main>
      </>
   );
};

export default Play;

