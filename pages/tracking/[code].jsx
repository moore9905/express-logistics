/* eslint-disable @next/next/no-img-element */
import { getRequest } from "@/components/state";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {CgSpinnerTwo} from "react-icons/cg"
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Redirect from "../redirect";
import Barcode from 'react-barcode';

export default function Home() {
  const router = useRouter()
  // const [state, setState] = React.useState([...data?.states])
  // const handleStates=(val)=>{
  //   const newStates = []
  //   for(let i=0; i<val?.length; i+=1){
  //     if(0!==val?.length-1 && i<val?.length){
  //       newStates.push(val?.states[i])
  //     }
  //     return newStates.filter(st=> st.index!==val?.states?.slice(-1)[0]?.index)
  // }
  // }
  // React.useEffect(()=>{
  //   const newStates = []
  //   for(let i=0; i<data?.states.length; i+=1){
  //     if(0!==data?.states.length-1 && i<data?.states.length){
  //       newStates.push(data?.states[i])
  //     }
  //     // const filtered = newStates?.pop()
  //     setState(newStates.filter(st=> st.index!==data?.states.slice(-1)[0].index))
  //     // setState(newStates.slice(-2, 0))
  //   }
  // },[data?.states])
  const {code} = router.query
  const [user, setUser] = React.useState(code ? jwtDecode(code) : null)
  React.useEffect(()=>{
    setUser(code ? jwtDecode(code) : null)
  },[code])
 
  const {data} = useQuery([user?._id], async ()=> getRequest({url:`/api/user/${user?._id}`}))
  const [del, setDels] = React.useState(data?.data)
  React.useEffect(()=>{
    setDels(data?.data)
  },[data?.data])
  console.log(del)
  return (
    <>
    {
      user?.isClient ?
    <div className='min-h-screen w-full' style={{
      backgroundImage: "url(/map.png)"
    }}>
      <div className="min-h-screen bg-transparent backdrop-blur-[5px]  w-full pt-8 md:px-10 px-6">
      <Link href="/">
        <img src='/logo.png' alt='' className='' />
      </Link>
      <div className="pt-7">
        <div className=" font-bold text-md pb-5">Welcome back {user?.first_name} {user?.last_name}</div>
        <div className=" font-bold text-xl pb-5">Ongoing Delivery</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="p-5 flex flex-col bg-white shadow-md rounded-[12px]" >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-[#B0B0B0] font-semibold text-sm pb-[6px]">Shipment number</div>
                <div className="pb-[10px] font-bold text-lg text-[#232323">{del?.number}</div>
                <div className="font-normal text-sm text-[#484a58]">{del?.product}</div>
              </div>
              <div className="">
                <motion.img src="/truck.png" alt="" />
              </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex gap-5 items-center">
              <div className="font-normal text-xs text-[#484a58]">Tracking Code:</div>
              <div className="font-normal text-xs text-[#484a58]">{user?.tracking_code}</div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex gap-5 items-center">
              <div className="font-normal text-xs text-[#484a58]">Origin/Departure:</div>
              <div className="font-normal text-xs text-[#484a58]">{del?.start_location}</div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex gap-5 items-center">
              <div className="font-normal text-xs text-[#484a58]">Destination:</div>
              <div className="font-normal text-xs text-[#484a58]">{del?.end_location}</div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex gap-5 items-center">
              <div className="font-normal text-xs text-[#484a58]">Sender:</div>
              <div className="font-normal text-xs text-[#484a58]">{del?.sender}</div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex gap-5 items-center">
              <div className="font-normal text-xs text-[#484a58]">Receiver:</div>
              <div className="font-normal text-xs text-[#484a58]">{user?.first_name} {user?.last_name}</div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex items-center gap-5">
              <div className="font-normal text-[#484a58]">Status:</div>
                { del?.status==="Pending" &&
                  <div className=" bg-yellow-100 text-yellow-700 rounded-lg py-2 px-4 flex items-center gap-2">
                <CgSpinnerTwo className=" animate-spin" />
                <div className="">
                  {del?.status}
                </div>
                </div>}
                { (del?.status==="Delivering"||del?.status==="Delivered") &&
                  <div className=" bg-green-100 text-green-700 rounded-lg py-2 px-4 flex items-center gap-2">
                {del?.status==="Delivering" ? <CgSpinnerTwo className=" animate-spin" /> : <AiOutlineCheckCircle className="" />}
                <div className="">
                  {del?.status}
                </div>
                </div>}
                { del?.status==="Cancelled" &&
                  <div className=" bg-red-100 text-red-700 rounded-lg py-2 px-4 flex items-center gap-2">
                <FaTimesCircle className="" />
                <div className="">
                  {del?.status}
                </div>
                </div>}
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex flex-col gap-6">
              {
                del?.states.slice(0, del?.states.length-1).map((loc, i)=>(
                  <div className="flex items-center gap-4" key={i}>
                      <img src="/location.png" alt="" />
                      <div className="flex flex-col gap-1">
                      <div className="font-bold text-[16px] leading-[19px] text-[#232323]">{loc.state} </div>
                      {/* <div className="font-normal text-xs">Rd. Santa Ana, Illinois 85486 </div> */}
                      </div>
                  </div>
                ))
              }  
            <div className="flex items-center gap-4">

                {
                del?.states.slice(-1)[0]?.state==="Cancelled" ?
                <FaTimesCircle className="text-red-700 h-[38px] w-[38px] " /> : del?.states.slice(-1)[0]?.state==="Delivered" ? <AiOutlineCheckCircle className="text-green-700 h-[38px] w-[38px]" /> : <img src="/loc.png" alt="" />
              }
                <div className="flex flex-col gap-1">
                <div className="font-bold text-[16px] leading-[19px] text-[#232323]">{del?.states.slice(-1)[0]?.state}</div>
                {/* <div className="font-normal text-xs">Rd. Santa Ana, Illinois 85486 </div> */}
                </div>
            </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
                <div className="w-full flex justify-center">
                  <Barcode value={user?.tracking_code} width={2} />
                </div>
          </div>
                </div>
      </div>
    </div>
    </div>
    :
    <Redirect />
    }
          </>
  )
}
