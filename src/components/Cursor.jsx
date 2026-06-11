"use client"
import { useEffect, useRef } from "react"

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  let rx = 0, ry = 0, mx = 0, my = 0

  useEffect(() => {
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.left = mx + "px"
        dot.current.style.top  = my + "px"
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ring.current) {
        ring.current.style.left = rx + "px"
        ring.current.style.top  = ry + "px"
      }
      requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    tick()

    const grow = () => {
      if (!dot.current || !ring.current) return
      dot.current.style.transform  = "translate(-50%,-50%) scale(2.5)"
      ring.current.style.width     = "56px"
      ring.current.style.height    = "56px"
      ring.current.style.opacity   = "0.25"
    }
    const shrink = () => {
      if (!dot.current || !ring.current) return
      dot.current.style.transform  = "translate(-50%,-50%) scale(1)"
      ring.current.style.width     = "32px"
      ring.current.style.height    = "32px"
      ring.current.style.opacity   = "0.55"
    }

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", grow)
      el.addEventListener("mouseleave", shrink)
    })

    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const base = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%,-50%)",
  }

  return (
    <>
      <div ref={dot} style={{
        ...base,
        width: 10, height: 10,
        background: "#D4626A",
        transition: "transform 0.2s ease",
      }} />
      <div ref={ring} style={{
        ...base,
        width: 32, height: 32,
        border: "1.5px solid #D4626A",
        opacity: 0.55,
        transition: "width 0.3s, height 0.3s, opacity 0.3s",
      }} />
    </>
  )
}