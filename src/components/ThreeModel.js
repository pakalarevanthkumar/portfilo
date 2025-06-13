// src/components/ThreeModel.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ThreeModel component renders an interactive 3D model (cube or glTF) with rotation and zoom
function ThreeModel() {
  const canvasRef = useRef(null); // Reference to the canvas element
  const modelRef = useRef(null); // Reference to store the 3D model for interactivity

  useEffect(() => {
    // Initialize Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / 400, // Aspect ratio (fixed height for Hero section)
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, 400); // Set canvas size (adjust height as needed)

    // Add ambient light to illuminate the model
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    // Add directional light for better 3D effect
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Create a simple cube as a fallback (or replace with glTF model)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    modelRef.current = cube; // Store cube in ref for interactivity
    scene.add(cube);

    // Optional: Load a glTF model (uncomment to use)
    /*
    const loader = new GLTFLoader();
    loader.load(
      '/assets/model.glb', // Path to glTF model in src/assets
      (gltf) => {
        scene.add(gltf.scene);
        modelRef.current = gltf.scene; // Store glTF model for interactivity
        gltf.scene.scale.set(1, 1, 1); // Adjust scale as needed
      },
      undefined,
      (error) => console.error('Error loading glTF model:', error)
    );
    */

    // Position camera
    camera.position.z = 5;

    // Animation loop for auto-rotation
    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Auto-rotate model
      }
      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction: Rotate model based on mouse movement
    const handleMouseMove = (event) => {
      if (modelRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        modelRef.current.rotation.x = mouseY * Math.PI; // Rotate vertically
        modelRef.current.rotation.y = mouseX * Math.PI; // Rotate horizontally
      }
    };

    // Zoom interaction: Adjust camera position with mouse wheel
    const handleWheel = (event) => {
      event.preventDefault();
      camera.position.z += event.deltaY * 0.005; // Zoom in/out
      camera.position.z = Math.max(2, Math.min(10, camera.position.z)); // Clamp zoom
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('wheel', handleWheel);

    // Handle window resize for responsiveness
    const handleResize = () => {
      renderer.setSize(window.innerWidth, 400);
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []); // Empty dependency array to run once on mount

  return <canvas ref={canvasRef} className="w-full h-[400px]" />;
}

export default ThreeModel;