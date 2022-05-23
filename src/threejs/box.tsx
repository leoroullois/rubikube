import React, { forwardRef, useState } from "react";

import { ColorMapping, IPieceState } from "@lib/cubes/types";
import { RoundedBox } from "@react-three/drei";

type Props = JSX.IntrinsicElements["mesh"] & {
   state: IPieceState<ColorMapping>;
   position: number[];
};

const Box = ({ state, position, ...props }: Props, ref: any) => {
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
            ref={ref}
            {...props}
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
      </>
   );
};

export default forwardRef(Box);

