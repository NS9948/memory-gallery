import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MemoryTransition from "./MemoryTransition";

const MemoryBookCover = () => {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleOpen = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
    };

    const handleTransitionComplete = () => {
        navigate("/memories");
    };

    return (
        <>
            <main className="memory-book-cover-page">

                <div className="memory-cover-decoration memory-cover-photo memory-cover-photo-left">
                    <img
                        src="public/textures/memory-photo-1.jpg"
                        alt=""
                    />
                </div>

                <div className="memory-cover-decoration memory-cover-photo memory-cover-photo-right">
                    <img
                        src="public/textures/memory-photo-2.jpg"
                        alt=""
                    />
                </div>

                <div className="memory-cover-decoration memory-cover-note">
                    <span>our little moments</span>
                </div>

                <motion.div
                    className="memory-book-float"
                    animate={{
                        y: [0, -7, 0, 7, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <button
                        type="button"
                        onClick={handleOpen}
                        disabled={isTransitioning}
                        className="memory-book-cover"
                    >
                        <div className="memory-book-cover-border">

                            <div className="memory-book-cover-content">

                                <p className="memory-book-cover-eyebrow">
                                    Our Story
                                </p>

                                <h1 className="memory-book-cover-title font-display">
                                    Memory Gallery
                                </h1>

                                <div className="memory-book-cover-divider" />

                                <p className="memory-book-cover-year">
                                    2024 — Forever
                                </p>

                            </div>

                        </div>
                    </button>
                </motion.div>

            </main>

            <AnimatePresence>
                {isTransitioning && (
                    <MemoryTransition
                        onComplete={handleTransitionComplete}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default MemoryBookCover;