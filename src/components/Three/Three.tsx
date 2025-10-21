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
    controls.enableRotate = false; // Disable default rotation
    controls.screenSpacePanning = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const dotWidth = 0.08;
    const dotHeight = 0.08;
    const dotDepth = 0.02;
    const margin = 0.1;

    const cols = 20;
    const rows = 15;
    const dotCount = cols * rows;

    // console.log(`Creating ${dotCount} dots (${cols} columns x ${rows} rows)`);

    const totalWidth = cols * (dotWidth + margin);
    const totalHeight = rows * (dotHeight + margin);
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;

    const blueMaterial = new THREE.MeshPhongMaterial({
      color: 0x0077ff,
      shininess: 100,
    });

    for (let i = 0; i < dotCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      const x = startX + col * (dotWidth + margin) + dotWidth / 2;
      const y = startY + row * (dotHeight + margin) + dotHeight / 2;
      const z = 0;

      const geometry = new THREE.BoxGeometry(dotWidth, dotHeight, dotDepth);
      const dot = new THREE.Mesh(geometry, blueMaterial);
      dot.position.set(x, y, z);

      dot.rotation.x = (Math.random() - 0.5) * 0.2;
      dot.rotation.y = (Math.random() - 0.5) * 0.2;

      scene.add(dot);
    }

    camera.position.set(0, 0, 3);

    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
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
        currentRotation.x = THREE.MathUtils.lerp(
          currentRotation.x,
          targetRotation.x,
          0.1
        );
        currentRotation.y = THREE.MathUtils.lerp(
          currentRotation.y,
          targetRotation.y,
          0.1
        );
      } else {
        // currentRotation.y += 0.005;
      }

      const radius = 3;
      camera.position.x =
        radius * Math.sin(currentRotation.y) * Math.cos(currentRotation.x);
      camera.position.y = radius * Math.sin(currentRotation.x);
      camera.position.z =
        radius * Math.cos(currentRotation.y) * Math.cos(currentRotation.x);

      camera.lookAt(0, 0, 0);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    console.log("Hover Controls:");
    console.log("- Move mouse to rotate the camera automatically");
    console.log("- Mouse wheel: Zoom in/out");
    console.log("- Right click + drag: Pan camera");
    console.log(`- Screen filled with ${dotCount} dots`);

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
