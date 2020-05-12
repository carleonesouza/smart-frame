import React from 'react'

const Image = () => {
    return (
        <div className='border-solid border-grey-200 border-2 m-8 p-8 rounded'>
            <h1 className='font-bold'>Image</h1>
           
            <div className='md:w-1/3'></div>
            <div className='relative'>
                <button className='bg-transparent mt-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded absolute bottom-0 right-0'>
                    Save</button>
            </div>
        </div>
    )
}

export default Image