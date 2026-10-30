import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export const NightSkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 3200);
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.7;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          hue: Math.random() > 0.8 ? 280 : Math.random() > 0.6 ? 45 : 220,
        });
      }
    };
    initStars();

    // Fireflies
    const fireflies: Firefly[] = [];
    for (let i = 0; i < 28; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 1.5 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.6,
        targetAlpha: 0.8,
      });
    }

    // Shooting Stars
    let shootingStar: ShootingStar | null = null;
    let lastShootingStarTime = Date.now();

    const triggerShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2;
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: 80 + Math.random() * 60,
        speed: 8 + Math.random() * 6,
        angle,
        alpha: 1,
        active: true,
      };
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha = star.baseAlpha + Math.sin(time * 2 + i) * 0.3;
        star.alpha = Math.max(0.05, Math.min(1, star.alpha));

        ctx.fillStyle = `hsla(${star.hue}, 80%, 90%, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Fireflies (floating glowing orbs)
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.vx;
        f.y += f.vy;

        // Gentle repulsion from mouse
        const dx = f.x - mouseX;
        const dy = f.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          f.x += (dx / dist) * 1.5;
          f.y += (dy / dist) * 1.5;
        }

        // Wrap boundaries
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        f.alpha += (f.targetAlpha - f.alpha) * 0.02;
        if (Math.abs(f.alpha - f.targetAlpha) < 0.05) {
          f.targetAlpha = 0.2 + Math.random() * 0.7;
        }

        // Glow gradient
        const radGrd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4);
        radGrd.addColorStop(0, `rgba(255, 235, 160, ${f.alpha})`);
        radGrd.addColorStop(0.4, `rgba(255, 210, 100, ${f.alpha * 0.4})`);
        radGrd.addColorStop(1, 'rgba(255, 210, 100, 0)');

        ctx.fillStyle = radGrd;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting Star Trigger & Render
      if (!shootingStar && Date.now() - lastShootingStarTime > 4500 + Math.random() * 3000) {
        triggerShootingStar();
        lastShootingStarTime = Date.now();
      }

      if (shootingStar && shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0) {
          shootingStar.active = false;
          shootingStar = null;
        } else {
          ctx.strokeStyle = `rgba(255, 245, 220, ${shootingStar.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep twilight atmospheric gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/src/assets/images/romantic_night_sky_1793190507100.jpg')`
        }}
      />
      {/* Soft gradient masks to keep content crisp and readable */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070913]/70 to-[#070913]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/80 via-transparent to-[#070913]" />

      {/* Interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
