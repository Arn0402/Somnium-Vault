import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // Optimized context
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Cache the gradient to avoid recreating it every frame
    let cachedGradient: CanvasGradient | null = null;
    
    const updateGradient = () => {
       cachedGradient = ctx.createRadialGradient(width/2, height/2, width/3, width/2, height/2, width);
       cachedGradient.addColorStop(0, 'rgba(2, 2, 4, 0)');
       cachedGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
    };
    updateGradient();

    const particles: Particle[] = [];
    const particleCount = 50; // Reduced slightly for performance

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 2;
        // Soft Lavender, Ethereal Teal, Champagne
        const colors = ['192, 132, 252', '45, 212, 191', '253, 224, 71']; 
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
        // REMOVED: ctx.shadowBlur which causes massive performance drops
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Use cached gradient
      if (cachedGradient) {
        ctx.fillStyle = cachedGradient;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      updateGradient();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;