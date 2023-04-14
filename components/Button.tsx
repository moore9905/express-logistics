import React from 'react'

export default function Button({value, click}: any) {
  return (
      <div className='rounded-[9px] w-full bg-[#4d47c3] text-white hover:bg-white hover:text-[#4d47c3] border-2 border-[#4d47c3] py-4 px-6 text-center shadow-lg text-[16px] leading-[24px] font-medium cursor-pointer transition-all duration-500' onClick={click}>{value}</div>
  )
}
