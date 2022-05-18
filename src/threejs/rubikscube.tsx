import { generatePositions } from "@lib/cube";
import { Position } from "@lib/types";
import React, { useState } from "react";
import Box from "./box";

export enum Color {
   Red = 0xc0392b,
   Green = 0x27ae60,
   Blue = 0x2980b9,
   Yellow = 0xf1c40f,
   Orange = 0xd35400,
   White = 0xecf0f1,
   Black = 0x2d3436,
}
const RubiksCube = () => {
   const cubePositions = useState<Position[]>(generatePositions());
   const { White, Yellow, Blue, Green, Red, Orange, Black } = Color;

   return (
      <>
         <Box
            colors={[Yellow, Orange, Green]}
            position={[0, 0, 0]}
            rotation={[1, 1, 0]}
         />
         <Box colors={[Yellow, Orange, Green]} position={[1.5, 0, 0]} />;
      </>
   );
};
export default RubiksCube;

