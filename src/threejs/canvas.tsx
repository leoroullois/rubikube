import {
   Environment,
   Lathe,
   OrbitControls,
   RoundedBox,
   Sky,
   Sphere,
   Text,
   Torus,
   TransformControls,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { FC } from "react";
import Box from "./box";
import Cube, { Color } from "./rubikscube";
const MyCanvas: FC = () => {
   const { White, Yellow, Blue, Green, Red, Orange, Black } = Color;
   return (
      <Canvas>
         <OrbitControls />

         <ambientLight intensity={0.5} />
         <directionalLight position={[-2, 5, 2]} intensity={1} />
         <Box colors={[Yellow, Orange, Green]} position={[0, 0, 0]} />
         <Box colors={[Yellow, Orange, Green]} position={[1.5, 0, 0]} />

         <directionalLight
            color={Color.Blue}
            position={[8, 2, 0]}
            intensity={0.2}
         />
      </Canvas>
   );
};

export default MyCanvas;

