import React from "react";
import Circle from "./circle";
import Rectangle from "./rectangle";

const Background = () => {
   return (
      <div className='absolute inset-0 z-0 dark:bg-neutral-900 to-transparent bg-[url("/patterns/cross.png")] bg-no-repeat bg-cover overflow-hidden'>
         <Circle />
         <Rectangle />
      </div>
   );
};

export default Background;

