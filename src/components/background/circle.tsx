import React, { FC } from "react";
interface IProps {
   left: number;
   top: number;
   opacity: number;
   color: string;
}
const Circle = () => {
   return (
      <div
         className={`h-96 w-96 absolute top-12 left-0 opacity-10 rounded-full bg-gradient-to-r from-red-500 to-transparent blur-2xl -rotate-45`}
      ></div>
   );
};

export default Circle;

