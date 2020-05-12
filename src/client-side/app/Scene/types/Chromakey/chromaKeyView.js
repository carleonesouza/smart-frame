import React from 'react'
import chroma from './assets/chromaKey.png'

const ChromaKeyView = ({frame}) => {
    return (
        <div>
            <h2> {frame.id} </h2>
            <img src={chroma} alt='' />
        </div>
    )
}
export default ChromaKeyView