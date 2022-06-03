import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Color, CubeArray } from "@lib/cubes/types";

interface IProps {
   cubeArray: CubeArray;
}

const CubePattern: FC<IProps> = ({ cubeArray }) => {
   const [colors] = useState({
      Red: "#c0392b",
      Green: "#27ae60",
      Blue: "#2980b9",
      Yellow: "#f1c40f",
      Orange: "#d35400",
      White: "#xecf0f1",
      Black: "#2d3436",
   });
   const mapColor = (color: Color): string => {
      switch (color) {
         case Color.White:
            return "bg-gray-200";
         case Color.Orange:
            return "bg-orange-500";
         case Color.Yellow:
            return "bg-yellow-500";
         case Color.Blue:
            return "bg-blue-500";
         case Color.Green:
            return "bg-green-400";
         case Color.Red:
            return "bg-red-500";
         default:
            return "bg-gray-200";
      }
   };
   return (
      <article className='flex flex-wrap h-72 w-96'>
         {cubeArray.map((face) => {
            let squares: any = [];
            for (let j = 0; j < 9; j++) {
               const div = (
                  <div
                     key={j}
                     className={`flex justify-center items-center h-8 w-8 text-slate-900 border border-gray-900 ${mapColor(
                        face[j]
                     )}`}
                  >
                     {j}
                  </div>
               );
               squares = [...squares, div];
            }
            return (
               <section
                  className='flex flex-wrap h-24 w-24 first:ml-24 first:mr-48 last:ml-24 last:mr-48 bg-indigo-500'
                  key={uuidv4()}
               >
                  {squares}
               </section>
            );
         })}
      </article>
   );
};

export default CubePattern;

