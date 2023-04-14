import React, { ChangeEventHandler } from 'react'

export default function LoginInput({ type, placeholder, change, id }: { type: React.HTMLInputTypeAttribute | undefined, placeholder: string, change: ChangeEventHandler<HTMLInputElement>, id: string }) {
  return (
        <input type={type} id={id} name={id} onChange={change} className='w-full rounded-lg bg-[#F0EFFF] placeholder-[#A7A3FF] text-[#A7A3FF] pl-6 py-5 outline-none' placeholder={placeholder} required />
  )
}
