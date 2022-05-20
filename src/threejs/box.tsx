import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { ColorMapping, IPieceState } from "@lib/types";
import { RoundedBox, TransformControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

type Props = JSX.IntrinsicElements["mesh"] & {
   state: IPieceState<ColorMapping>;
   position: number[];
};

const Box: FC<Props> = ({ state, position, ...props }) => {
   const mesh = useRef<any>(null!);

   const handleClick: any = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const box = mesh.current;
      console.log(box);
   };
   const {
      0: color0,
      1: color1,
      2: color2,
      3: color3,
      4: color4,
      5: color5,
   } = state;

   const [x, y, z] = position;

   const [pieceSize] = useState(0.95);
   return (
      <>
         <RoundedBox
            args={[1, 1, 1] as any}
            position={position}
            radius={0.05}
            smoothness={4}
            ref={mesh}
            {...props}
            onClick={handleClick}
         >
            <meshPhongMaterial color={ColorMapping.Black} />

            {/* Face 0 */}
            <RoundedBox
               args={[pieceSize, pieceSize, 0.5]}
               position={[0, 0, 0.26]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color0 ?? ColorMapping.Black} />
            </RoundedBox>
            {/* Face 1 */}
            <RoundedBox
               args={[0.5, pieceSize, pieceSize]}
               position={[0.26, 0, 0]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color1 ?? ColorMapping.Black} />
            </RoundedBox>
            {/* Face 2 */}
            <RoundedBox
               args={[pieceSize, 0.5, pieceSize]}
               position={[0, 0.26, 0]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color2 ?? ColorMapping.Black} />
            </RoundedBox>
            {/* Face 3 */}
            <RoundedBox
               args={[pieceSize, pieceSize, 0.5]}
               position={[0, 0, -0.26]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color3 ?? ColorMapping.Black} />
            </RoundedBox>
            {/* Face 4 */}
            <RoundedBox
               args={[0.5, pieceSize, pieceSize]}
               position={[-0.26, 0, 0]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color4 ?? ColorMapping.Black} />
            </RoundedBox>
            {/* Face 5 */}
            <RoundedBox
               args={[pieceSize, 0.5, pieceSize]}
               position={[0, -0.26, 0]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={color5 ?? ColorMapping.Black} />
            </RoundedBox>
         </RoundedBox>
         {/* <TransformControls object={mesh} mode='translate' /> */}
      </>
   );
};

export default Box;

