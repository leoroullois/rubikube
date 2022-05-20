import React, { FC, useRef, useState } from "react";

import { CubeArray, cubeArrayToRubik, generatePositions } from "@lib/cube";
import { Position } from "@lib/types";

import Box from "./box";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface IProps {
   cubeArray: CubeArray;
}
const RubiksCube: FC<IProps> = ({ cubeArray }) => {
   const [cubePositions] = useState<Position[]>(generatePositions());
   const ref = useRef<any>();

   const [state] = useState<any>(cubeArrayToRubik(cubeArray));
   // TODO/ makeRotateGroup : renvoie un array des cubes à bouger, prends en entrée la face à bouger (L,R,...)
   // TODO: disolveRotateGroup
   useFrame(() => {
      if(ref.current) {
         ref.current.rotation.y+=0.005}
      }
      )
   return (
      <group rotation={[0.5, 0.75, 0]} scale={0.75} ref={ref}>
         {cubePositions.map((position, i) => {
            return (
               <Box
                  key={position.join("-")}
                  state={state[i]}
                  position={position}
               />
            );
         })}
      </group>
   );
};
export default RubiksCube;

