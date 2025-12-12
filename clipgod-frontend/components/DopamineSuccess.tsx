import { motion } from 'framer-motion';

export const DopamineSuccess = () => (
  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
    Live! 🎉
  </motion.div>
);
