import * as drei from "@react-three/drei";
import { Edges, TransformControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { FC, MouseEvent, useRef } from "react";
import { Color } from "./rubikscube";

type Props = JSX.IntrinsicElements["mesh"] & { color: Color };

const Box: FC<Props> = ({ color, ...props }) => {
   const ref = useRef<any>(null!);

   const handleClick: any = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const box = ref.current;
      //   box.position.z = Math.random() * 2 - 1;
   };
   return (
      <>
         <mesh {...props} onClick={handleClick} ref={ref}>
            <boxBufferGeometry attach='geometry' args={[1, 2, 3]} />
            <meshLambertMaterial attach='material' color={color} />
         </mesh>
         <TransformControls object={ref} mode='translate' />
      </>
   );
};

export default Box;

