import React, { FC, useState } from "react";

import { CubeArray, cubeArrayToRubik, generatePositions } from "@lib/cube";
import { Position } from "@lib/types";

import Box from "./box";

interface IProps {
   cubeArray: CubeArray;
}
const RubiksCube: FC<IProps> = ({ cubeArray }) => {
   const [cubePositions] = useState<Position[]>(generatePositions());
   console.log("state : ", cubeArray);

   const [state] = useState<any>(cubeArrayToRubik(cubeArray));
   // TODO/ makeRotateGroup : renvoie un array des cubes à bouger, prends en entrée la face à bouger (L,R,...)
   // TODO: disolveRotateGroup
   return (
      <>
         {cubePositions.map((position, i) => {
            return (
               <Box
                  key={position.join("-")}
                  state={state[i]}
                  position={position}
               />
            );
         })}
      </>
   );
};
export default RubiksCube;

