import React, { FC, useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as THREE from "three";

import { Moves } from "@lib/cubes/Moves";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { Position, Spin } from "@lib/cubes/types";
import { useFrame, useThree } from "@react-three/fiber";
import { selectCube } from "@store/selectors";
import { addToRotateGroup, setCurrMove } from "@store/slices/cube";
import Box from "./box";
import store from "@store/store";

interface IProps {
   cube: ThreeByThree;
}

const RubiksCube: FC<IProps> = ({ cube }) => {
   const dispatch = useDispatch();
   const { currMove, rotateGroup, currRotate } = useSelector(selectCube);
   // const myCube = useSelector(selectCube);

   const [cubePositions] = useState<Position[]>(cube.getCubePositions());
   const ref = useRef<any>();
   const scene = useThree((state) => state.scene);

   const [state] = useState<any>(cube.cubeArrayToRubik(cube.cubeArray));
   const refs = useRef<any>(new Array());
   const [sideToMove, setSideToMove] = useState(new THREE.Object3D());
   const mapRotateGroup = (rotateGroup: number[]) => {
      for (const index of rotateGroup) {
         sideToMove.add(refs.current[index]);
      }
   };

   const animate = () => {
      if (currRotate > Math.PI / 2) {
         // disolveRotateGroup();
      } else if (currMove) {
         if ([Moves.F, Moves.Bi].includes(currMove)) {
            // groupRotate.rotation.z -= 0.12;
            sideToMove.rotation.z -= 0.12;
            dispatch(addToRotateGroup(0.12));
         } else if ([Moves.B, Moves.Fi].includes(currMove)) {
            sideToMove.rotation.z += 0.12;
            dispatch(addToRotateGroup(0.12));
         } else if ([Moves.R, Moves.Li].includes(currMove)) {
            sideToMove.rotation.x -= 0.12;
            dispatch(addToRotateGroup(0.12));
         } else if ([Moves.L, Moves.Ri].includes(currMove)) {
            sideToMove.rotation.x += 0.12;
            dispatch(addToRotateGroup(0.12));
         } else if ([Moves.Ui, Moves.D].includes(currMove)) {
            sideToMove.rotation.y += 0.12;
            dispatch(addToRotateGroup(0.12));
         } else if ([Moves.U, Moves.Di].includes(currMove)) {
            sideToMove.rotation.y -= 0.12;
            dispatch(addToRotateGroup(0.12));
         }
      }
   };
   useFrame(({ camera }) => {
      camera.clear();
      if (currMove) {
         // dispatch(makeRotateGroup(currMove));
         console.log(currMove);
         animate();
      }
   });
   return (
         <group rotation={[0.5, 0.75, 0]} scale={0.75} ref={ref}>
            {cubePositions.map((position, i) => {
               return (
                  <Box
                     key={position.join("-")}
                     state={state[i]}
                     position={position}
                     ref={(element) => {
                        refs.current[i] = element;
                     }}
                  />
               );
            })}
         </group>
   );
};
export default RubiksCube;

