import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const AnimatedSection = ({
  children,
  delay = 0.2,
  duration = 0.5,
  animationType = "fadeIn",
  className,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const selectedAnimation = animations[animationType];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedAnimation}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
