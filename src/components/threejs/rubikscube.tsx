import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";

import { Moves } from "@lib/cubes/Moves";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { Position } from "@lib/cubes/types";
import { useFrame, useThree } from "@react-three/fiber";
import { selectCube } from "@store/selectors";
import {
  addToCurrRotate,
  disolveRotateGroup,
  setBtnClicked,
} from "@store/slices/cube";

import Box from "./box";

interface IProps {
  cube: ThreeByThree;
}

const RubiksCube: FC<IProps> = ({ cube }) => {
  useSelector(selectCube);

  const [state] = useState<any>(cube.getHexRubik());
  const refs = useRef<THREE.Mesh[]>(new Array(26).fill(null));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      for (let i = 0; i < 27; i++) {
        refs.current[i].name = Number(i).toString();
      }
    }
    setMounted(true);
  }, [mounted]);

  return (
    <group scale={1.2}>
      {cube.getCubePositions().map((position, i) => {
        return (
          <Box
            key={position.join("-")}
            state={state[i]}
            position={position}
            init={i}
            name={Number(i).toString()}
            ref={(element: THREE.Mesh) => {
              refs.current[i] = element as THREE.Mesh;
            }}
          />
        );
      })}
    </group>
  );
};
export default RubiksCube;
