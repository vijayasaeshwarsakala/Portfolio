import React, { useEffect, useRef } from 'react';
import { useSpiderSense } from '../../context/SpiderSenseContext';

export const SpiderWebCanvas = () => {
  const canvasRef = useRef(null);
  const { spiderSenseActive } = useSpiderSense();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate web nodes
    const nodeCount = Math.min(Math.floor(width / 22), 65);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw web lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Mouse connection web lines
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = nodeA.x - mouse.x;
          const dyMouse = nodeA.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = (1 - distMouse / mouse.radius) * (spiderSenseActive ? 0.7 : 0.45);
            ctx.strokeStyle = spiderSenseActive ? `rgba(255, 30, 39, ${opacity})` : `rgba(229, 9, 20, ${opacity * 0.8})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Inter-node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            const opacity = (1 - dist / 130) * (spiderSenseActive ? 0.35 : 0.18);
            ctx.strokeStyle = spiderSenseActive ? `rgba(255, 30, 39, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = spiderSenseActive ? '#FF1E27' : '#E50914';
        ctx.shadowBlur = spiderSenseActive ? 12 : 6;
        ctx.shadowColor = '#E50914';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [spiderSenseActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
