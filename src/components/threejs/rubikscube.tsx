import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";

import { Moves } from "@lib/cubes/Moves";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { Position } from "@lib/cubes/types";
import { TransformControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { selectCube } from "@store/selectors";
import { addToCurrRotate, disolveRotateGroup } from "@store/slices/cube";

import Box from "./box";

interface IProps {
   cube: ThreeByThree;
}

const RubiksCube: FC<IProps> = ({ cube }) => {
   const dispatch = useDispatch();
   const { currMove, rotateGroup, currRotate } = useSelector(selectCube);
   const [cubePositions] = useState<Position[]>(cube.getCubePositions());
   const ref = useRef<any>();
   const scene = useThree((state) => state.scene);

   const [state] = useState<any>(cube.getHexRubik());
   const refs = useRef<THREE.Mesh[]>(new Array(26).fill(null));
   const [sideToMove, setSideToMove] = useState(new THREE.Group());
   const [mainPieces, setMainPieces] = useState(new THREE.Group());

   const animate = () => {
      const step = Math.PI / (2 * 35);
      if (currRotate >= Math.PI / 2 - step / 2) {
         dispatch(disolveRotateGroup());
      } else if (currMove) {
         if ([Moves.F, Moves.Bi].includes(currMove)) {
            sideToMove.rotation.z -= step;
            dispatch(addToCurrRotate(step));
         } else if ([Moves.B, Moves.Fi].includes(currMove)) {
            sideToMove.rotation.z += step;
            dispatch(addToCurrRotate(step));
         } else if ([Moves.R, Moves.Li].includes(currMove)) {
            sideToMove.rotation.x -= step;
            dispatch(addToCurrRotate(step));
         } else if ([Moves.L, Moves.Ri].includes(currMove)) {
            sideToMove.rotation.x += step;
            dispatch(addToCurrRotate(step));
         } else if ([Moves.Ui, Moves.D].includes(currMove)) {
            sideToMove.rotation.y += step;
            dispatch(addToCurrRotate(step));
         } else if ([Moves.U, Moves.Di].includes(currMove)) {
            sideToMove.rotation.y -= step;
            dispatch(addToCurrRotate(step));
         }
      }
   };

   useFrame(({ camera }) => {
      camera.clear();

      if (currRotate === 0) {
         for (let i = 0; i < 27; i++) {
            if (!rotateGroup.includes(i)) {
               mainPieces.add(refs.current[i]);
            } else {
               sideToMove.add(refs.current[i]);
            }
         }
         scene.add(mainPieces);
         scene.add(sideToMove);
      }

      animate();
   });

   const updateRefs = (pRefs: React.MutableRefObject<any>) => {
      const vRefs = [...refs.current];
      // ! vRefs[0].position.x = 5;
      // console.log(refs.current[0]);
      // console.log(vRefs[0]);
   };
   useEffect(() => {
      updateRefs(refs);
   });
   return (
      <group scale={0.75} ref={ref}>
         {cubePositions.map((position, i) => {
            return (
               <Box
                  key={position.join("-")}
                  state={state[i]}
                  position={position}
                  ref={(element: THREE.Mesh) => {
                     refs.current[i] = element as THREE.Mesh;
                  }}
               />
            );
         })}
         <TransformControls ref={ref} />
      </group>
   );
};
export default RubiksCube;

