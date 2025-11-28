import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

function Model(props) {
    const { scene } = useGLTF('/robot.glb');
    const ref = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Floating animation
        ref.current.position.y = -1 + Math.sin(t / 1.5) / 10;

        // Smooth look-at mouse interaction
        const x = (state.mouse.x * 0.5);
        const y = (state.mouse.y * 0.5);
        ref.current.rotation.y = x;
        ref.current.rotation.x = -y;
    });

    return (
        <primitive
            object={scene}
            ref={ref}
            {...props}
            scale={hovered ? 2.2 : 2}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        />
    );
}

const RobotCanvas = () => {
    return (
        <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />

            <Model position={[0, -1, 0]} />

            <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

export default RobotCanvas;
