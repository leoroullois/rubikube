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
// const Cube = () => {
//    return (
//       <>
//          <Box position={[1, 1, 0]} rotation={[0, 0, 0]} color={Color.Blue} />
//          <Box position={[0, -1, 0]} rotation={[0, 0, 0]} color={Color.Orange} />
//       </>
//    );
// };

const Cube = () => {
   const cubePositions = useState<Position[]>(generatePositions());

   return <p>Test</p>;
};
export default Cube;

