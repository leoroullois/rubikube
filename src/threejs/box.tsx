import * as drei from "@react-three/drei";
import { Edges, TransformControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { FC, MouseEvent, useRef } from "react";
import { Color } from "./RubiksCube";

type Props = JSX.IntrinsicElements["mesh"] & { color: Color };

const Box: FC<Props> = ({ color, ...props }) => {
   const ref = useRef<THREE.Mesh>(null!);

   const handleClick: any = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      const box = ref.current;
      //   box.position.z = Math.random() * 2 - 1;
   };
   return (
      <>
         <mesh {...props} ref={ref} onClick={handleClick}>
            <boxBufferGeometry attach='geometry' args={[1, 2, 3]} />
            <meshLambertMaterial attach='material' color={color}/>
         </mesh>
         <TransformControls object={ref} mode='translate' />
      </>
   );
};

export default Box;
