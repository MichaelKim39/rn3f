import { View } from "react-native";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { useGLTF, Stage } from "@react-three/drei/native";

import useControls from "r3f-native-orbitcontrols";
import { Gyroscope } from "expo-sensors";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

const Model = () => {
  const gltf = useGLTF(require("../assets/chicken.glb")) as GLTF;
  const mesh = useRef();
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);
  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useFrame((state, delta) => {
    const xVal = ~~(x * 100) / 5000;
    const yVal = ~~(y * 100) / 5000;
    if (mesh.current) {
      (mesh.current as THREE.Object3D).rotation.x += xVal;
      (mesh.current as THREE.Object3D).rotation.y += yVal;
    }
  });
  return <primitive object={gltf.scene} ref={mesh} />;
};

export const Chicken = () => {
  const [OrbitControls, events] = useControls();

  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <Suspense>
          <mesh>
            <Stage preset="rembrandt" intensity={1} environment="city">
              <Model />
            </Stage>
          </mesh>
        </Suspense>
      </Canvas>
    </View>
  );
};
