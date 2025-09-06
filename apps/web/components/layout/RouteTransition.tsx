// app/components/RouteTransition.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function RouteTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        // exit={{ opacity: 0, y: -8, transition: { duration: 1 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
