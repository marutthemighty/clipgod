import { motion } from 'framer-motion';

export const Confetti = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 pointer-events-none"
  >
    {/* Confetti particles with framer-motion */}
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-red-500"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, 100], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    ))}
  </motion.div>
);
