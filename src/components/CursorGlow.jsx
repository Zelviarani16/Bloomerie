"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const trailConfig = { damping: 40, stiffness: 80 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailSpringX = useSpring(trailX, trailConfig);
  const trailSpringY = useSpring(trailY, trailConfig);

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const addHover = () => { isHovering.current = true; };
    const removeHover = () => { isHovering.current = false; };

    window.addEventListener("mousemove", move);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-50"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(139,26,43,0.15) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--crimson-light)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}