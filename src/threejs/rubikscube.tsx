import React, { createRef, FC, forwardRef, useRef, useState } from "react";
import { Mesh } from "three";

import { Moves } from "@lib/cubes/Moves";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
// import { CubeArray, cubeArrayToRubik, generatePositions } from "@lib/cube";
import { MappingPiece, Position, Spin } from "@lib/cubes/types";
import { useFrame } from "@react-three/fiber";

import Box from "./box";
import * as THREE from "three";
interface IProps {
   cube: ThreeByThree;
}

const RubiksCube: FC<IProps> = ({ cube }) => {
   const [cubePositions] = useState<Position[]>(cube.getCubePositions());
   const ref = useRef<any>();

   const [rotateGroup, setRotateGroup] = useState<any>([]);
   const [spin, setSpin] = useState<Spin | null>(null);
   const [currRotate, setCurrRotate] = useState(0);
   const [currMove, setCurrMove] = useState<null | Moves>(null);

   const [state] = useState<any>(cube.cubeArrayToRubik(cube.cubeArray));
   const refs = Array(260).fill(createRef());
   const piece0 = useRef<any>(null);
   const makeRotateGroup = (face: Moves): void => {
      setRotateGroup([]);
      const group: any = [];
      for (const [key, piece] of Object.entries(cube.stateMapping)) {
         const index = Number(key);
         if (
            index >= 0 &&
            index < 9 &&
            (face === Moves.F || face === Moves.Fi)
         ) {
            group.push(refs[index])
         } else if (
            index >= 18 &&
            index < 27 &&
            (face === Moves.B || face === Moves.Bi)
         ) {
            group.push(refs[index])
         } else if (
            ((index >= 0 && index < 4) ||
               (index >= 9 && index < 12) ||
               (index >= 18 && index < 21)) &&
            (face === Moves.D || face === Moves.Di)
         ) {
            group.push(refs[index])
         } else if (
            ((index >= 6 && index < 9) ||
               (index >= 15 && index < 18) ||
               (index >= 24 && index < 27)) &&
            (face === Moves.U || face === Moves.Ui)
         ) {
            group.push(refs[index])
         } else if (
            (index === 0 ||
               index === 9 ||
               index === 18 ||
               index === 3 ||
               index === 12 ||
               index === 21 ||
               index === 6 ||
               index === 15 ||
               index === 24) &&
            (face === Moves.R || face === Moves.Ri)
         ) {
            group.push(refs[index])
         } else if (
            (index === 2 ||
               index === 11 ||
               index === 20 ||
               index === 5 ||
               index === 14 ||
               index === 23 ||
               index === 8 ||
               index === 17 ||
               index === 26) &&
            (face === Moves.L || face === Moves.Li)
         ) {
            group.push(refs[index])
         }
      }
      setRotateGroup(group);
   };

   const disolveRotateGroup = () => {
      setRotateGroup([]);
      setCurrRotate(0);
      setCurrMove(null);
   };

   const animate = () => {
      if (currRotate > Math.PI / 2) {
         disolveRotateGroup();
      } else if (currMove) {
         if ([Moves.F, Moves.Bi].includes(currMove)) {
            // groupRotate.rotation.z -= 0.12;
            ref.current.rotation.z -= 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         } else if ([Moves.B, Moves.Fi].includes(currMove)) {
            // groupRotate.rotation.z += 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         } else if ([Moves.R, Moves.Li].includes(currMove)) {
            // groupRotate.rotation.x -= 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         } else if ([Moves.L, Moves.Ri].includes(currMove)) {
            // groupRotate.rotation.x += 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         } else if ([Moves.Ui, Moves.D].includes(currMove)) {
            // groupRotate.rotation.y += 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         } else if ([Moves.U, Moves.Di].includes(currMove)) {
            // groupRotate.rotation.y -= 0.12;
            setCurrRotate((currRotate) => currRotate + 0.12);
         }
      }
   };
   useFrame(({ camera }) => {
      camera.clear();
      setCurrMove(Moves.F);
      animate();
   });
   return (
      <group rotation={[0.5, 0.75, 0]} scale={0.75} ref={ref}>
         {cubePositions.map((position, i) => {
            return (
               <Box
                  key={position.join("-")}
                  state={state[i]}
                  position={position}
                  ref={i === 0 ? piece0 : null}
               />
            );
         })}
      </group>
   );
};
export default RubiksCube;

