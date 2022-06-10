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
interface ARef {
  nbPiece: number;
  ref: THREE.Mesh;
}

interface IMapNbPieces {
  init: number;
  new: number;
}

interface IRefMapping {
  move: Moves;
  map: IMapNbPieces[];
}

const refMapping: IRefMapping[] = [
  {
    move: Moves.F,
    map: [
      {
        init: 0,
        new: 2,
      },
      {
        init: 1,
        new: 5,
      },
      {
        init: 2,
        new: 8,
      },
      {
        init: 3,
        new: 1,
      },
      {
        init: 4,
        new: 4,
      },
      {
        init: 5,
        new: 7,
      },
      {
        init: 6,
        new: 0,
      },
      {
        init: 7,
        new: 3,
      },
      {
        init: 8,
        new: 6,
      },
    ],
  },
  {
    move: Moves.U,
    map: [
      {
        init: 6,
        new: 8,
      },
      {
        init: 7,
        new: 17,
      },
      {
        init: 8,
        new: 26,
      },
      {
        init: 15,
        new: 7,
      },
      {
        init: 16,
        new: 16,
      },
      {
        init: 17,
        new: 25,
      },
      {
        init: 24,
        new: 6,
      },
      {
        init: 25,
        new: 15,
      },
      {
        init: 26,
        new: 24,
      },
    ],
  },
];

const RubiksCube: FC<IProps> = ({ cube }) => {
  const dispatch = useDispatch();
  const { currMove, rotateGroup, mainGroup, currRotate, btnClicked } =
    useSelector(selectCube);
  const [cubePositions] = useState<Position[]>(cube.getCubePositions());

  const scene = useThree((state) => state.scene);

  const [state] = useState<any>(cube.getHexRubik());
  const refs = useRef<THREE.Mesh[]>(new Array(26).fill(null));

  const [mounted, setMounted] = useState(false);

  const [aRefs, setARefs] = useState<ARef[]>(null!);

  const [sideToMove, setSideToMove] = useState(new THREE.Group());
  const [mainPieces, setMainPieces] = useState(new THREE.Group());

  const getPieceByNumber = (nbPiece: number) => {
    return aRefs.find((ref) => ref.nbPiece === nbPiece)?.ref ?? null;
  };

  const updateRefs = (move: Moves) => {
    console.warn(
      "[BEGIN] update refs",
      move,
      aRefs.map((r) => r.nbPiece)
    );

    const vRefs = [...aRefs];
    interface IUpdate {
      i: number;
      newNbPiece: number;
    }
    let update: IUpdate[] = [];
    const map = refMapping.find((map) => map.move === move)?.map;
    if (map) {
      for (const { init: initIndex, new: newIndex } of map) {
        const index = vRefs.findIndex((ref) => ref.nbPiece === initIndex);
        if (index !== -1) {
          // const newIndex = vRefs.findIndex(
          //   (ref) => ref.nbPiece === mapNbPiece.new
          // );

          // vRefs[index].nbPiece = newIndex;
          update.push({
            i: index,
            newNbPiece: newIndex,
          });
        } else {
          console.error("Piece not found");
        }
      }
      console.log(update);
      for (const { i, newNbPiece } of update) {
        vRefs[i].nbPiece = newNbPiece;
      }
      update = [];
    }
    setARefs(vRefs);

    console.warn(
      "[END] update refs",
      move,
      aRefs.map((r) => r.nbPiece)
    );
  };

  const animate = () => {
    const step = Math.PI / (2 * 30);
    if (currRotate >= Math.PI / 2 - step / 2) {
      if (currMove) {
        const x = Math.PI / 2 - currRotate;
        if ([Moves.F, Moves.Bi].includes(currMove)) {
          sideToMove.rotation.z -= x;
        } else if ([Moves.B, Moves.Fi].includes(currMove)) {
          sideToMove.rotation.z += x;
        } else if ([Moves.R, Moves.Li].includes(currMove)) {
          sideToMove.rotation.x -= x;
        } else if ([Moves.L, Moves.Ri].includes(currMove)) {
          sideToMove.rotation.x += x;
        } else if ([Moves.Ui, Moves.D].includes(currMove)) {
          sideToMove.rotation.y += x;
        } else if ([Moves.U, Moves.Di].includes(currMove)) {
          sideToMove.rotation.y -= x;
        }
        updateRefs(currMove);
        mainPieces.clear();
        sideToMove.clear();
        aRefs.forEach(({ ref, nbPiece }) => {
          mainPieces.add(ref);
          const position = new ThreeByThree().getCubePositions()[nbPiece];
          if (
            currMove === Moves.F &&
            (nbPiece === 0 ||
              nbPiece === 1 ||
              nbPiece === 2 ||
              nbPiece === 3 ||
              nbPiece === 4 ||
              nbPiece === 5 ||
              nbPiece === 6 ||
              nbPiece === 7 ||
              nbPiece === 8)
          ) {
            ref.position.setX(position[0]);
            ref.position.setY(position[1]);
            ref.position.setZ(position[2]);
            ref.rotateZ(-Math.PI / 2);
          }
        });
      }

      dispatch(disolveRotateGroup());

      console.log(
        "refs end of animation",
        aRefs.map((r) => r.nbPiece),
        aRefs.map((r) => r.ref.position)
      );
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
    setARefs(
      refs.current.map((ref, i) => {
        return {
          ref,
          nbPiece: i,
        };
      })
    );
    setMounted(true);
  }, [mounted]);

  useFrame(({ camera }) => {
    if (mounted) {
      camera.clear();
      if (btnClicked) {
        sideToMove.clear();
        mainPieces.clear();
        for (const nbPiece of rotateGroup) {
          const piece = aRefs.find((ref) => ref.nbPiece === nbPiece);
          // const piece = getPieceByNumber(nbPiece);
          if (piece) {
            sideToMove.add(piece.ref);
            console.info(
              "[SIDE TO MOVE] Piece added : ",
              piece.nbPiece,
              piece.ref
            );
          }
        }

        for (const nbPiece of mainGroup) {
          const piece = aRefs.find((ref) => ref.nbPiece === nbPiece);
          if (piece) {
            mainPieces.add(piece.ref);
          }
        }

        console.log("Rotate group :", rotateGroup);
        console.log("Main group :", mainGroup);

        dispatch(setBtnClicked(false));
        console.log("sideToMove", sideToMove);
      }
      scene.add(mainPieces);
      scene.add(sideToMove);
      // sideToMove.position.x+=0.01;
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
