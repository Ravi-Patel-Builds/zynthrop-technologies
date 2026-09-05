import React, { useEffect, useRef } from 'react';

export const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive reactive traces
    let mouse = { x: -1000, y: -1000, isHovering: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Nodes and traces
    interface Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      pulse: number;
      isCoral: boolean;
    }

    const nodeCount = Math.min(Math.floor(width / 45), 42);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        pulse: Math.random() * Math.PI * 2,
        isCoral: Math.random() > 0.7, // 30% nodes are coral accent
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections between nearby nodes with 90-degree bend routing (circuit style)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 190) {
            let opacity = (1 - dist / 190) * 0.18;
            
            // Check proximity to cursor
            if (mouse.isHovering) {
              const mouseDist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
              if (mouseDist < 160) {
                opacity = Math.min(0.85, opacity * 3.5);
              }
            }

            ctx.strokeStyle = a.isCoral || b.isCoral
              ? `rgba(255, 122, 89, ${opacity * 0.75})`
              : `rgba(138, 148, 166, ${opacity * 0.55})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            // Orthogonal circuit turn: half-x, full-y
            const midX = (a.x + b.x) / 2;
            ctx.lineTo(midX, a.y);
            ctx.lineTo(midX, b.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw interactive connection from cursor to nearby nodes
        if (mouse.isHovering) {
          const mDist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (mDist < 140) {
            const mOpacity = (1 - mDist / 140) * 0.45;
            ctx.strokeStyle = `rgba(255, 122, 89, ${mOpacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(a.x, mouse.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
        }
      }

      // Draw circuit nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulse += 0.02;

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Gentle attraction to mouse if close
        if (mouse.isHovering) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 10) {
            node.x += (dx / dist) * 0.15;
            node.y += (dy / dist) * 0.15;
          }
        }

        // Wrap edges
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const pulseScale = 0.8 + 0.3 * Math.sin(node.pulse);

        // Ring contact
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = node.isCoral
          ? 'rgba(255, 122, 89, 0.3)'
          : 'rgba(138, 148, 166, 0.2)';
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isCoral
          ? '#FF7A59'
          : '#4A5568';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep matte charcoal backdrop with warm radial illumination */}
      <div 
        className="absolute inset-0 bg-[#121418]" 
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -10%, #1c212a 0%, #121418 100%)'
        }}
      />

      {/* Subtle Coral Ambient Glow Zones */}
      <div className="absolute top-[-15%] right-[-5%] w-[650px] h-[650px] rounded-full bg-[#FF7A59]/4 blur-[140px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#FF7A59]/3 blur-[160px]" />
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#181b22]/70 blur-[100px]" />

      {/* High-tech circuit canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Fine grid lines overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #8A94A6 1px, transparent 1px),
            linear-gradient(to bottom, #8A94A6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};
