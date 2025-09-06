"use client";
import { motion } from "framer-motion";

export function FadeInOnView({
  children,
  viewport,
  variants,
  key,
}: {
  children: React.ReactNode;
  viewport?: any;
  variants?: any;
  key?: string;
}) {
  const defaultVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  };
  return (
    <motion.div
      initial="hidden"
      key={key}
      whileInView="show"
      viewport={viewport || { once: true, amount: 0.25 }} // 25% visible pour déclencher
      variants={
        variants || {
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
        }
      }
    >
      {children}
    </motion.div>
  );
}
