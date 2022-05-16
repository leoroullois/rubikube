import Cube from "@components/logos/cube";
import CubeInlineOblique from "@components/logos/cube-2-oblique";
import Image from "next/image";
import React from "react";

const Copyright = () => {
   const year = new Date().getFullYear();
   return (
      <div className='flex flex-row items-center gap-x-2'>
         <span>Copyright © {year}</span>
         <CubeInlineOblique />
      </div>
   );
};

export default Copyright;

