import { FC, useState } from "react";
import { Provider, ReactReduxContext } from "react-redux";
import * as THREE from "three";

import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";

import RubiksCube from "./rubikscube";

interface IProps {
  cube?: ThreeByThree;
}
const Canvas: FC<IProps> = (props) => {
  const [cube] = useState(props.cube ? props.cube : new ThreeByThree());
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <FiberCanvas>
          <Provider store={store}>
            <OrbitControls
              enableZoom={false}
              mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
              }}
              enablePan={false}
            />
            <ambientLight intensity={0.2} />

            <directionalLight position={[5, -5, -5]} intensity={0.8} />
            <directionalLight position={[-5, 5, 5]} intensity={0.8} />

            <RubiksCube cube={cube} />
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          </Provider>
        </FiberCanvas>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Canvas;
