import React from "react";
import MemoryBookEntrance from "../../components/memory-book/MemoryBookEntrance";

const MemoryBookPage = () => {
    return (
        <main className="memory-book-page">

            <div className="memory-page-decoration memory-page-photo memory-page-photo-left">
                <img
                    src="public/textures/memory-photo-1.jpg"
                    alt=""
                />
            </div>

            <div className="memory-page-decoration memory-page-photo memory-page-photo-right">
                <img
                    src="public/textures/memory-photo-2.jpg"
                    alt=""
                />
            </div>

            <div className="memory-page-decoration memory-page-note">
                <span>
                    kept here,<br />
                    for a long time
                </span>
            </div>

            <div className="memory-page-book">
                <MemoryBookEntrance />
            </div>

        </main>
    );
};

export default MemoryBookPage;