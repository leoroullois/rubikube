import React, { FC, useRef, useState } from "react";

// import { CubeArray, cubeArrayToRubik, generatePositions } from "@lib/cube";
import { Position } from "@lib/cubes/types";

import Box from "./box";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";

interface IProps {
   cube: ThreeByThree;
}
const RubiksCube: FC<IProps> = ({ cube }) => {
   const [cubePositions] = useState<Position[]>(cube.getCubePositions());
   const ref = useRef<any>();

   const [state] = useState<any>(cube.cubeArrayToRubik(cube.cubeArray));
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

