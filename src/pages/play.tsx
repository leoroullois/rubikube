import Head from "next/head";
import { useEffect, useState } from "react";
import Canvas from "../threejs/canvas";

const Play = () => {
   const [mounted, setMounted] = useState(false);
   useEffect(() => {
      setMounted(true);
   }, []);
   return (
      <>
         <Head>
            <title>Play with AI</title>
         </Head>
         <main>
            <h1>Play</h1>
            {mounted && <Canvas />}
         </main>
      </>
   );
};

export default Play;

