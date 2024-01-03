import React from "react";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.h1>
    </div>
  );
};

export default NotFoundPage;
