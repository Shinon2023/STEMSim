"use client"; // ระบุให้คอมโพเนนต์ทำงานที่ฝั่ง Client

import { useEffect } from 'react';
import Matter from 'matter-js';

export default function Simulation() {
  useEffect(() => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.body,
      engine: engine
    });

    const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
    const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Matter.World.add(engine.world, [boxA, boxB, ground]);

    Matter.Engine.run(engine);
    Matter.Render.run(render);
  }, []);

  return (
    <div>
      <h1>Physics Simulation</h1>
    </div>
  );
}
