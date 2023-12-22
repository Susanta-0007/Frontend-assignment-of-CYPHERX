import React from 'react'
import { FaRegCircle } from "react-icons/fa6";


const Card = ({data}) => {


  return data == null ? <p>Fetch Data</p> : (
    <div className='bg-white rounded-md  border-[2px] w-[280px] max-md:w-[350px]  border-solid border-balck flex flex-col gap-2 justify-center p-2' >
        <p>{data?.id}</p>
        <p className='flex font-semibold'><p className='rounded-full h-[12px] w-[12px]  border-[2px] border-solid border-black mt-2 mr-1 '></p><span>{data?.title}</span></p>
        
        <p className='flex'> 
          <p className='border-[1px] border-solid rounded-sm border-gray-400 h-[20px] w-[20px] mt-1 mr-2'></p>
        <p className='border-[1px] border-gray-300  rounded-sm border-solid p-[2px] w-[60%] flex '>
          <p className='rounded-full h-[12px] w-[12px]  border-[2px] border-solid border-black mt-[6px] mr-1 ml-1'></p>
 {data?.tag[0]}</p>
        </p>
    </div>
  )
}

export default Card