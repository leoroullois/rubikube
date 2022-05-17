import React, { FC, MouseEvent, useEffect, useRef } from "react";
import * as THREE from "three";

import {
   Cloud,
   Edges,
   Environment,
   GradientTexture,
   MeshWobbleMaterial,
   RoundedBox,
   Sky,
   Sparkles,
   Stars,
   Text3D,
   Trail,
   TransformControls,
} from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

import { Color } from "./rubikscube";
import inter from "../assets/fonts/Inter_Regular.json";
import { IoColorFillSharp } from "react-icons/io5";

type Props = JSX.IntrinsicElements["mesh"] & {
   colors: Color[];
   position: number[];
};

const Box: FC<Props> = ({ colors, position, ...props }) => {
   const mesh = useRef<any>(null!);

   const handleClick: any = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const box = mesh.current;
      console.log(box);
      //   box.position.z = Math.random() * 2 - 1;
      // mesh.current.geometry.faces[5].color.setHex(0x0000ff);
   };

   const [x, y, z] = position;
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
            <meshPhongMaterial color={Color.Black} />

            <RoundedBox args={[0.5, 0.99, 0.99]} position={[0.26, 0, 0]}>
               <meshPhongMaterial color={colors[0]} />
            </RoundedBox>
            <RoundedBox
               args={[0.999, 0.5, 0.999]}
               position={[0, -0.26, 0]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={colors[1]} />
            </RoundedBox>
            <RoundedBox
               args={[0.999, 0.999, 0.5]}
               position={[0, 0, -0.26]}
               radius={0.05}
               smoothness={4}
            >
               <meshPhongMaterial color={colors[2]} />
            </RoundedBox>
         </RoundedBox>
         <TransformControls object={mesh} mode='translate' />
      </>
   );
};

export default Box;

