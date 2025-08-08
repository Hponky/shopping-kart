"use client";

import { motion, type MotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  transition?: MotionProps['transition'];
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ whileHover = { scale: 1.02 }, whileTap = { scale: 0.98 }, transition = { type: "spring", stiffness: 400, damping: 17 }, ...props }, ref) => {
    return (
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transition}
      >
        <Button ref={ref} {...props} />
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };