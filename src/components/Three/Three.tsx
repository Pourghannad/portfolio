import { useRef, useEffect } from "react";
import * as THREE from "three";
// @ts-expect-error: Module 'three/examples/jsm/controls/OrbitControls' has no type declarations
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import style from "./three.module.scss";

export default function Three() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001122);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.5;
    controls.enableRotate = false;
    controls.screenSpacePanning = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    fillLight.position.set(-10, 5, -5);
    scene.add(fillLight);

    // Perfectly organized dots - precise measurements
    const dotWidth = 0.08;
    const dotHeight = 0.08;
    const dotDepth = 0.02;
    const margin = 0.12; // Consistent margin on all sides

    const cols = 12;
    const rows = 8;
    const dotCount = cols * rows;

    const totalWidth = cols * dotWidth + (cols - 1) * margin;
    const totalHeight = rows * dotHeight + (rows - 1) * margin;
    const startX = -totalWidth / 2 + dotWidth / 2;
    const startY = totalHeight / 2 - dotHeight / 2; // Start from top

    console.log(`Grid: ${cols} columns × ${rows} rows`);
    console.log(
      `Total width: ${totalWidth.toFixed(
        2
      )}, Total height: ${totalHeight.toFixed(2)}`
    );
    console.log(`Dot size: ${dotWidth.toFixed(2)} × ${dotHeight.toFixed(2)}`);
    console.log(`Margin: ${margin.toFixed(2)}`);

    const blueMaterial = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      shininess: 100,
      specular: 0x2222ff,
    });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + col * (dotWidth + margin);
        const y = startY - row * (dotHeight + margin);
        const z = 0; // All dots on the same Z plane for perfect alignment

        const geometry = new THREE.BoxGeometry(
          dotWidth,
          dotHeight,
          dotDepth,
          1,
          1,
          1
        );
        const dot = new THREE.Mesh(geometry, blueMaterial);
        dot.position.set(x, y, z);

        // NO rotation - perfectly aligned with world axes
        dot.rotation.x = 0;
        dot.rotation.y = 0;
        dot.rotation.z = 0;

        scene.add(dot);
      }
    }

    // Camera position - perfect top-down view initially
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2(0, 0); // Start with no rotation
    let isMouseMoving = false;
    let mouseTimeout: number | undefined;
    interface MouseMoveHandler {
      (event: MouseEvent): void;
    }

    const handleMouseMove: MouseMoveHandler = (event: MouseEvent): void => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.x = mouse.y * Math.PI * 0.25; // Vertical rotation
      targetRotation.y = mouse.x * Math.PI * 0.5; // Horizontal rotation

      isMouseMoving = true;

      clearTimeout(mouseTimeout);

      mouseTimeout = window.setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            
            if (isMouseMoving) {
                currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRotation.x, 0.08);
                currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRotation.y, 0.08);
            } else {
                // Very slow auto-rotation to maintain organization visibility
                currentRotation.y += 0.001;
            }
            
            const radius = 5;
            camera.position.x = radius * Math.sin(currentRotation.y) * Math.cos(currentRotation.x);
            camera.position.y = radius * Math.sin(currentRotation.x);
            camera.position.z = radius * Math.cos(currentRotation.y) * Math.cos(currentRotation.x);
            
            camera.lookAt(0, 0, 0);
            controls.update();
            renderer.render(scene, camera);
        };
        
        animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div className={style["three-container"]} ref={mountRef} />;
}
