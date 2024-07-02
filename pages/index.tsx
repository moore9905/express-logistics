import Link from 'next/link'
import React from 'react'

export default function index() {
  return (
    <div className='h-screen bg-black/40 text-white flex items-center justify-center flex-col bg-cover bg-center gap-3' style={{
        backgroundImage: `url(/bg.jpg)`
    }}>
        <div className="text-5xl text-center">Welcome to <span className='font-extrabold'>EXPRESS LOGISTIC SERVICE</span></div>
        <div className="text-center px-3">to start tracking your items click on get started and input your tracking code</div>
        <div className="flex justify-center max-w-xs w-full">
            <Link href='/login' className="px-12 py-3 rounded-md text-white bg-[#4d47c3] border-2 border-[#4d47c3] hover:bg-white transition-all duration-500 hover:scale-105 transform hover:text-[#4d47c3] cursor-pointer">Get Started</Link>
        </div>
    </div>
  )
}
