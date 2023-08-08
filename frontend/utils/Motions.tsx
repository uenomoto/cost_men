import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export const Motions = ({ children }: Props) => {
  const animateBox = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animateBox}
    >
      {children}
    </motion.div>
  );
};
