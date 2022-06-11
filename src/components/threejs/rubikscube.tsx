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
  const dispatch = useDispatch();
  const { currMove, rotateGroup, currRotate, btnClicked } =
    useSelector(selectCube);
  const [cubePositions] = useState<Position[]>(cube.getCubePositions());

  const scene = useThree((state) => state.scene);

  const [state] = useState<any>(cube.getHexRubik());
  const refs = useRef<THREE.Mesh[]>(new Array(26).fill(null));

  const [mounted, setMounted] = useState(false);

  const [sideToMove] = useState(new THREE.Object3D());
  const [mainPieces] = useState(new THREE.Object3D());

  const animate = async () => {
    const step = Math.PI / (2 * 20);
    if (currRotate >= Math.PI / 2) {
      if (currMove) {
        cube.move(currMove);
        if ([Moves.F, Moves.Bi].includes(currMove)) {
          sideToMove.rotateZ(currRotate);
        } else if ([Moves.B, Moves.Fi].includes(currMove)) {
          sideToMove.rotateZ(-currRotate);
        } else if ([Moves.R, Moves.Li].includes(currMove)) {
          sideToMove.rotateX(currRotate);
        } else if ([Moves.L, Moves.Ri].includes(currMove)) {
          sideToMove.rotateX(-currRotate);
        } else if ([Moves.Ui, Moves.D].includes(currMove)) {
          sideToMove.rotateY(-currRotate);
        } else if ([Moves.U, Moves.Di].includes(currMove)) {
          sideToMove.rotateY(currRotate);
        }

        // for (let i = 0; i < 27; i++) {
        //   const ref = refs.current[i];
        //   mainPieces.add(ref);
        // }
      }
      dispatch(disolveRotateGroup());
      console.log(
        "refs end of animation",
        refs.current.map((r) => r.position)
      );
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

  useEffect(() => {
    if (!mounted) {
      for (let i = 0; i < 27; i++) {
        refs.current[i].name = Number(i).toString();
      }
    }
    setMounted(true);
  }, [mounted]);

  useFrame(({ camera }) => {
    if (mounted) {
      camera.clear();
      if (btnClicked) {
        for (let i = 0; i < 27; i++) {
          if (rotateGroup.includes(i)) {
            sideToMove.add(refs.current[i]);
          } else {
            mainPieces.add(refs.current[i]);
          }
        }
        dispatch(setBtnClicked(false));
      }
      scene.add(mainPieces);
      scene.add(sideToMove);

      animate();
    }
  });

  return (
    <group scale={0.75}>
      {cubePositions.map((position, i) => {
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
