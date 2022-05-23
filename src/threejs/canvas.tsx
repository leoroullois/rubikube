import { FC, useState } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import RubiksCube from "./rubikscube";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import * as THREE from "three";

const Canvas: FC = () => {
   const [cube] = useState(new ThreeByThree());
   return (
      <FiberCanvas>
         <OrbitControls
            enableZoom={false}
            mouseButtons={{
               LEFT: THREE.MOUSE.ROTATE,
               MIDDLE: THREE.MOUSE.DOLLY,
               RIGHT: THREE.MOUSE.ROTATE,
            }}
            enablePan={false}
         />
         <ambientLight intensity={0.2} />

         <directionalLight position={[5, -5, -5]} intensity={0.8} />
         <directionalLight position={[-5, 5, 5]} intensity={0.8} />

         <RubiksCube cube={cube} />
      </FiberCanvas>
   );
};

export default Canvas;

