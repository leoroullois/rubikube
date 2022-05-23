import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";

import Canvas from "../threejs/canvas";

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
            <button onClick={handleClick}>Move left</button>
            {mounted && <Canvas />}
         </main>
      </>
   );
};

export default Play;

