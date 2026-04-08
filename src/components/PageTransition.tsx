"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ── Top progress bar ── */
function NavProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start the bar immediately on route change
    setActive(true);
    setWidth(0);

    // Animate to ~85% quickly, then finish on unmount/next effect
    const t1 = setTimeout(() => setWidth(30), 50);
    const t2 = setTimeout(() => setWidth(65), 200);
    const t3 = setTimeout(() => setWidth(85), 500);

    // Complete + hide after animation
    const t4 = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setActive(false);
        setWidth(0);
      }, 350);
    }, 700);

    timerRef.current = t4;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (!active && width === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${width}%`,
        background: "linear-gradient(90deg, #3D6B40, #7BC47F, #4E8A52)",
        zIndex: 9999,
        transition: width === 100
          ? "width 0.3s ease-out, opacity 0.35s ease"
          : "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        opacity: width === 100 ? 0 : 1,
        boxShadow: "0 0 8px rgba(61,107,64,0.6)",
        borderRadius: "0 2px 2px 0",
      }}
    />
  );
}

/* ── Page content transition ── */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setIsAnimating(true);
    setDisplayChildren(children);

    // Increment key to force CSS re-animation
    setAnimKey(k => k + 1);

    const t = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <NavProgressBar />
      <div
        key={animKey}
        style={{
          animation: "pageEnter 0.38s cubic-bezier(0.22, 1, 0.36, 1) both",
          willChange: "opacity, transform",
        }}
      >
        {displayChildren}
      </div>
    </>
  );
}
