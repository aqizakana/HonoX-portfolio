import * as THREE from "three";
import { useEffect, useRef } from 'hono/jsx';
import { initializeScene } from './initial';
import { Box } from "./objects/Box";

export const Three = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && canvasRef.current) {
            const background = initializeScene(canvasRef.current);
            backgroundRef.current = background;

            const box = new Box();
            background.scene.add(box.getMesh());

            background.animate();
        } else {
            console.log('Canvas not yet mounted or running in SSR.');
        }
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="canvas" width={400} height={400}></canvas>
        </div>
    );
};
