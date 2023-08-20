import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MouseTracker = ({ def_initScale = 1 }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setX(mouseX);
    setY(mouseY);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Adding divList as a dependency

  return (
    <>
      <motion.div
        animate={{ scale: def_initScale }}
        transition={{
          scale: { duration: 0.3, delay: 0.05, ease: "easeInOut" },
          delay: 5,
        }}
        className={`scale-[${def_initScale}] h-4 w-4 z-50 ${
          def_initScale === 1 ? "bg-white" : "bg-transparent"
        } border-1 rounded-full fixed pointer-events-none left-[${x}px] top-[${y}px] blur-sm shadow-white`}
      ></motion.div>
    </>
  );
};

export default MouseTracker;
