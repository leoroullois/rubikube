import React from "react";
import Box from "./box";

export enum Color {
   Red = 0xff0000,
   Green = 0x00ff00,
   Blue = 0x0000ff,
   Yellow = 0xffff00,
   Orange = 0xffa500,
   White = 0xffffff,
}
const Cube = () => {
   return (
      <>
         <Box position={[1, 1, 0]} rotation={[0, 0, 0]} color={Color.Blue} />
         <Box position={[0, -1, 0]} rotation={[0, 0, 0]} color={Color.Orange} />
      </>
   );
};

export default Cube;
