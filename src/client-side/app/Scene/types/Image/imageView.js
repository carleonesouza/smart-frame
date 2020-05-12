import React from 'react'

const ImageView = ({frame}) => {
    return (
        <div>
            <h2> {frame.id} </h2>
            <img src={frame.url} alt='' />
        </div>
    )
}

export default ImageView