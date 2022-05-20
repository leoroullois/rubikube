import { FC } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import RubiksCube from "./rubikscube";
import { initialCubeArray, stateMapping } from "@lib/cube";

const Canvas: FC = () => {
   return (
      <FiberCanvas>
         <OrbitControls enableZoom={true} />

         <ambientLight intensity={0.2} />

         <directionalLight position={[5, -5, -5]} intensity={0.8} />
         <directionalLight position={[-5, 5, 5]} intensity={0.8} />

         <RubiksCube cubeArray={initialCubeArray}/>
      </FiberCanvas>
   );
};

export default Canvas;

