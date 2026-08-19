import React from 'react'

const BookPage = ({ side, memory }) => {
    return (
        <div className={`book-page book-page-${side}`}>
            <div className="book-page-content h-full">

                {side === "left" ? (
                    <div className="flex flex-col items-center justify-center gap-4 h-full">

                        <div className="memory-photo">
                            <img
                                src={memory.image}
                                alt={memory.title}
                                className="memory-photo-image"
                            />
                        </div>

                        <h1 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#3f3529]">
                            {memory.title}
                        </h1>

                    </div>
                ) : (
                    <div className="flex flex-col h-full p-8 md:p-10">

                        <div>
                            <h2 className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#756858]">
                                {memory.date}
                            </h2>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <p className="max-w-md font-display text-xl md:text-2xl font-light italic leading-relaxed text-center text-[#4b4034]">
                                "{memory.description}"
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#756858]">
                                --{memory.location}--
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default BookPage