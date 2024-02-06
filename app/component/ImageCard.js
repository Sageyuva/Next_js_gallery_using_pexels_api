import React from 'react'

const ImageCard = (props) => {
  return (
    <div className="items-center justify-center rounded p-2 min-w-[180px] flex flex-col gap-2 h-[auto] rounded bg-slate-700">
    <img src={props.imgg} className='w-[98%] rounded h-[400px] object-cover' alt="" />
    <a className='text-white text-center w-[90%] px-3 py-1 font-bold bg-blue-600 rounded' target='_blank' href={props.imgg}>View Image</a>
    {/* <button className='text-white w-[90%] px-3 py-1 font-bold bg-green-600 rounded' >Download Image</button> */}
    </div>
  )
}

export default ImageCard