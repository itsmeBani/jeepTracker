


import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
};

const Jeep3Dmodel = () => {
    const modelUrl =  "../public/jeepney/scene.gltf" // Ensure the path is correct

    return (
        <div style={{ width: '40vw', height: '40vh' }}>
            <Canvas camera={{ position: [0, 10, 0], fov: 60 }}>
                {/* Set camera position to [0, 10, 0] for top-down view, and adjust fov */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Model url={modelUrl} />
                </Suspense>
                <OrbitControls
                    enableZoom={false} // Enable zoom functionality
                    zoomSpeed={400}   // Adjust zoom speed as needed
                    minPolarAngle={Math.PI / 3}  // Lock vertical movement to simulate top-down view
                    maxPolarAngle={Math.PI / 2}  // Lock vertical movement to simulate top-down view
                />
            </Canvas>
        </div>
    );
};

export default Jeep3Dmodel;
