import { PropsWithChildren } from "react";
import * as motion from "motion/react-client";

export default function BoardItemWrapper({
  children,
  color,
}: PropsWithChildren<{ color: string }>) {
  return (
    <motion.div
      style={{ border: `2px solid ${color}` }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
    >
      {children}
    </motion.div>
  );
}
