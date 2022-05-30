import { FC, useState } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import RubiksCube from "./rubikscube";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import * as THREE from "three";
import {
   Provider,
   ReactReduxContext,
   useDispatch,
   useSelector,
} from "react-redux";
import { selectCube } from "@store/selectors";
import store from "@store/store";

const Canvas: FC = () => {
   const dispatch = useDispatch();
   const currMove = useSelector(selectCube).currMove;

   const [cube] = useState(new ThreeByThree());
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
               </Provider>
            </FiberCanvas>
         )}
      </ReactReduxContext.Consumer>
   );
};

export default Canvas;

