import { Button, View } from "react-native";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { useGLTF, Stage } from "@react-three/drei/native";

import useControls from "r3f-native-orbitcontrols";
import { Gyroscope } from "expo-sensors";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

const Model = ({ modelRef }) => {
  // const gltf = useGLTF(require("../assets/chicken.glb")) as GLTF;
  const gltf = useGLTF(require("../assets/pokemon/sudowoodo.glb")) as GLTF;

  const [{ x, y }, setData] = useState({
    x: 0,
    y: 0,
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

  const getRotatedValues = (
    xCurrent: number,
    xRotation: number,
    yCurrent: number,
    yRotation: number
  ) => {
    const xMaxRotation = 0.9;
    const xMinRotation = -0.5;
    const yMaxRotation = 1.3;

    return {
      xRotated: Math.min(
        Math.max(xCurrent + xRotation, xMinRotation),
        xMaxRotation
      ),
      yRotated: Math.min(
        Math.max(yCurrent + yRotation, -yMaxRotation),
        yMaxRotation
      ),
    };
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useFrame((state, delta) => {
    const xRotation = ~~(x * 100) / 5000;
    const yRotation = ~~(y * 100) / 5000;

    if (modelRef.current) {
      const xCurrent = (modelRef.current as THREE.Object3D).rotation.x;
      const yCurrent = (modelRef.current as THREE.Object3D).rotation.y;

      const { xRotated, yRotated } = getRotatedValues(
        xCurrent,
        xRotation,
        yCurrent,
        yRotation
      );

      (modelRef.current as THREE.Object3D).rotation.x = xRotated;
      (modelRef.current as THREE.Object3D).rotation.y = yRotated;

      // console.log(xRotated, yRotated);
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

export const Chicken = () => {
  const [OrbitControls, events] = useControls();
  const modelRef = useRef();

  const handleRecenter = () => {
    (modelRef.current as THREE.Object3D).rotation.x = 0;
    (modelRef.current as THREE.Object3D).rotation.y = 0;
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <Suspense>
          <mesh rotation={[0.2, 0, 0]}>
            <Stage preset="rembrandt" intensity={1} environment="city">
              <Model modelRef={modelRef} />
            </Stage>
          </mesh>
        </Suspense>
      </Canvas>
      <Button title="Recenter" onPress={handleRecenter} />
    </View>
  );
};
