import {
   Lathe,
   OrbitControls,
   RoundedBox,
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
   return (
      <Canvas>
         <OrbitControls />

         <ambientLight intensity={0.5} />
         <directionalLight position={[-2, 5, 2]} intensity={1} />
         <Cube />
         <Text color='black' anchorX='center' anchorY='middle'>
            Lorem ipsum dolor sit
         </Text>
         <RoundedBox position={[5, 0, 0]} radius={0.05} smoothness={4}>
            <meshPhongMaterial color={Color.Red} />
         </RoundedBox>
         <Sphere position={[2.5, 0, 0]}>
            <meshToonMaterial color={Color.Green} />
         </Sphere>
         <Torus position={[7.5, 0, 0]}>
            <meshBasicMaterial color={Color.Blue} />
         </Torus>
         <Lathe position={[0, 2.5, 0]}>
            <meshBasicMaterial color={Color.Yellow} />
         </Lathe>
         <directionalLight
            color={Color.Blue}
            position={[8, 2, 0]}
            intensity={0.2}
         />
      </Canvas>
   );
};

export default MyCanvas;

