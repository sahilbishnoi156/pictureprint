import { delay, motion, transform } from "framer-motion";
import { useState, useEffect } from "react";
const  MouseTracker = ({def_initScale = 1}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return (
    <motion.div
      animate={{ scale: def_initScale }}
      transition={{ scale: { duration: 0.3, delay: .05, ease: "easeInOut" }, delay:5 }}
      className={`scale-[${def_initScale}] h-4 w-4 z-50 ${def_initScale === 1 ? "bg-white" : "bg-transparent"} border-2 rounded-full fixed pointer-events-none left-[${x}px] top-[${y}px]`}
    ></motion.div>
  );
};

export default MouseTracker;