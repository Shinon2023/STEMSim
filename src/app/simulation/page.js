"use client";
import * as THREE from "three";
import { useEffect } from "react";

const BlackHoleSimulation = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box_mesh = new THREE.Mesh(geometry, material);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    scene.add(wireframe);
    scene.add(box_mesh);

    const box = new THREE.Group();
    box.add(box_mesh);
    box.add(wireframe);
    scene.add(box);

    camera.position.z = 5;

    // สร้าง Animation
    const animate = () => {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);
  }, []);
  return null;
};

export default BlackHoleSimulation;
