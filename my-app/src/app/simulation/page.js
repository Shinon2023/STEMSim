import { useEffect } from 'react';
import Matter from 'matter-js';

export default function Home() {
  useEffect(() => {
    // Create an engine
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.body,
      engine: engine
    });

    // Create two boxes and a ground
    const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
    const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // Add all of the bodies to the world
    Matter.World.add(engine.world, [boxA, boxB, ground]);

    // Run the engine
    Matter.Engine.run(engine);

    // Run the renderer
    Matter.Render.run(render);
  }, []);

  return (
    <div>
      <h1>Physics Simulation with Matter.js</h1>
    </div>
  );
}
