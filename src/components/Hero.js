import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeModel from './ThreeModel';
import heroBg from '../images/hero-bg.jpg';


function Hero() {
  const canvasRef = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, 400);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, 400);
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="bg-hero-bg bg-cover bg-center h-screen flex items-center justify-center" 
     style={{ backgroundImage: `url(${heroBg})` }} >
      <div className="text-center text-white">
        <h1 className="text-5xl">John Doe</h1>
        <p className="text-2xl">Frontend Web Developer</p>
        <a href="#projects" className="bg-blue-500 text-white px-4 py-2 rounded">View My Work</a>
        <canvas ref={canvasRef} className="mt-4" />
      </div>
      <ThreeModel />
    </section>
  );
}
export default Hero;
