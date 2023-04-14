/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import LoginInput from '@/components/LoginInput'
import Button from '@/components/Button'
import Link from 'next/link'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

export default function Login() {
  const { addToast } = useToasts()
  const [state, setState] = React.useState({
    email: "",
    password: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit =(e: any)=>{
    const {email, password} = state
    axios.post("/api/auth/login", state)
    .then(res=>{
      addToast(res.data.message, {
        appearance: 'success',
        autoDismiss: true,
      })
    })
  }
  return (
      <div className={`pt-8 px-10 min-h-screen`}>
        <Link href="/">
        <img src='/logo.png' alt='' className='' />
        </Link>
        <div className="pt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 md:px-20 lg:px-40">
                <div className="md:flex flex-col hidden">
                    <div className=" font-semibold text-[50px] leading-[75px]">Sign In to</div>
                    <div className=" font-medium text-[35px] leading-[52px]">Tracking</div>
                    <div className="flex items-start pt-14">
              <div className="">If you don’t have an account register <br />
                You can   Register here !</div>
                      <div className="max-h-[556px] max-w-[313px]">
                        <img src="/login.png" alt="" className='w-full h-full' />
                      </div>
                    </div>
                </div>
                <div className="flex flex-col h-full justify-center">
                  <div className="w-full font-medium text-[30px] leading-[45px] pb-7">Sign In</div>
                  <div className="w-full pb-9">
                    <LoginInput change={handleChange} id={'email'} type={'text'} placeholder={'Enter email address'} />
                  </div>
                  <div className="w-full">
              <LoginInput change={handleChange} id={'password'} type={'password'} placeholder={'Password'} />
                  </div>
            <div className="w-full flex justify-end pt-4 font-normal text-[13px] leading-5 text-[#B0B0B0] pb-11 ">Forgot Password?</div>
                  <div className="w-full">
                    <Button value="Login" click={handleSubmit} />
                  </div>
                </div>
            </div>

        </div>
    </div>
  )
}
