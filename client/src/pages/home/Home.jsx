import { motion } from "motion/react";
import MemoryBookCover from "../../components/memory-book/MemoryBookCover";

const heroItem = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
};

const heroContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const memoryContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const memoryItem = {
    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
        },
    },
};

const memoryImage = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: "easeOut",
        },
    },
};

const Home = () => {
    return (
        <main className="bg-background text-foreground">

            <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    variants={heroContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-5"
                >
                    <p className="text-xs tracking-[0.35em] uppercase text-muted">
                        Memory Gallery
                    </p>

                    <motion.h1
                        variants={heroItem}
                        className="text-5xl md:text-7xl font-display font-light tracking-tight"
                    >
                        Our Story
                    </motion.h1>

                    <motion.p
                        variants={heroItem}
                        className="max-w-md text-base md:text-lg font-sans text-muted leading-relaxed"
                    >
                        Every memory has a story...
                    </motion.p>

                    <motion.div
                        initial={{
                            y:0
                        }}
                        animate={{
                            y:3
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.2,
                            ease: "easeInOut"
                        }}
                        className="mt-10 text-muted text-sm italic">
                        Scroll to begin
                    </motion.div>
                </motion.div>
            </section>

            <section className="flex items-center justify-center px-6">
    
                <MemoryBookCover
                    onOpen={() => {
                        console.log("Open memory book");
                    }}
                />

            </section>

        </main>
    );
};

export default Home;