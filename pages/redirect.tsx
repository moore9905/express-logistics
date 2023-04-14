import { useRouter } from 'next/router'
import React from 'react'

export default function Redirect() {
   const router =  useRouter()
//    React.useEffect(()=>{
//     router.push('/')
//    },[])
  return (
    <div className='h-screen w-full flex items-center justify-center text-5xl font-bold'>Loading............</div>
  )
}
