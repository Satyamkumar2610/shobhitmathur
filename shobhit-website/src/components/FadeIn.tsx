import type { ReactNode } from "react";
import { useInView } from "../hooks/useScroll";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  const { ref, inView } = useInView(threshold);
  return (
    <div
      ref={ref}
      className={`fade-in ${inView ? "fade-in--visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
