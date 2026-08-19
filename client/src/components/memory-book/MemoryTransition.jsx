import React, { useEffect } from "react";
import { motion } from "framer-motion";

const MemoryTransition = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.main
            className="memory-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="memory-transition-content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            >
                <p className="memory-transition-eyebrow">
                    Memory Gallery
                </p>

                <h1 className="memory-transition-title font-display">
                    Opening your memories...
                </h1>

                <motion.div
                    className="memory-transition-divider"
                    initial={{ width: 0 }}
                    animate={{ width: 70 }}
                    transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: "easeOut",
                    }}
                />

                <motion.p
                    className="memory-transition-caption"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                    }}
                >
                    Take a moment.
                </motion.p>
            </motion.div>
        </motion.main>
    );
};

export default MemoryTransition;