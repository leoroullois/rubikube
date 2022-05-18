import { FC } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import RubiksCube from "./rubikscube";

const Canvas: FC = () => {
   return (
      <FiberCanvas>
         <OrbitControls />

         <ambientLight intensity={0.2} />

         <directionalLight position={[5, -5, -5]} intensity={0.8} />

         <RubiksCube />
      </FiberCanvas>
   );
};

export default Canvas;

