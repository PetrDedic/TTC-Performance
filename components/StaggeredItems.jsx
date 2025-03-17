import { motion } from "framer-motion";

export const StaggeredItems = ({
  children,
  delayBetween = 0.1,
  staggerDirection = "forward",
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayBetween,
        staggerDirection: staggerDirection === "reverse" ? -1 : 1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, ...props }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
};
