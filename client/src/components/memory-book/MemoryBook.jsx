import React from 'react'
import BookPage from './BookPage'
import { memoryBookData } from './memoryBookData'

const MemoryBook = () => {
    return (
        <div className="memory-book">
            <BookPage 
                side="left"
                memory={memoryBookData[0]}
            />
            
            <div className="memory-book-spine" />

            <BookPage
                side="right" 
                memory={memoryBookData[1]}
            />
        </div>
    )
}

export default MemoryBook