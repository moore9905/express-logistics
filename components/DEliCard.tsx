import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { FaTimesCircle } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { deleteRequest } from './state'

export default function DEliCard({data, open, edit}) {
  const router = useRouter()
  const isPath = router.pathname==="/[token]" ? true : false
  const [state, setState] = React.useState([...data?.states])
  React.useEffect(()=>{
    const newStates = []
    for(let i=0; i<data?.states.length; i+=1){
      if(0!==data?.states.length-1 && i<data?.states.length){
        newStates.push(data?.states[i])
      }
      // const filtered = newStates?.pop()
      setState(newStates.filter(st=> st.index!==data?.states.slice(-1)[0].index))
      // setState(newStates.slice(-2, 0))
    }
  },[data?.states])
  return (
    <div className="p-5 flex flex-col bg-white shadow-md rounded-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-[#B0B0B0] font-semibold text-sm pb-[6px]">Shipment number</div>
                <div className="pb-[10px] font-bold text-lg text-[#232323">{data.number}</div>
                <div className="font-normal text-sm text-[#484a58]">{data.product}</div>
              </div>
              <div className="">
                <motion.img drag src="/truck.png" alt="" />
              </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex items-center gap-5">
              <div className="font-normal text-[#484a58]">Status:</div>
                { data?.status==="Pending" &&
                  <div className=" bg-yellow-100 text-yellow-700 rounded-lg py-2 px-4 flex items-center gap-2">
                <CgSpinnerTwo className=" animate-spin" />
                <div className="">
                  {data?.status}
                </div>
                </div>}
                { (data?.status==="Delivering"||data?.status==="Delivered") &&
                  <div className=" bg-green-100 text-green-700 rounded-lg py-2 px-4 flex items-center gap-2">
                {data?.status==="Delivering" ? <CgSpinnerTwo className=" animate-spin" /> : <AiOutlineCheckCircle className="" />}
                <div className="">
                  {data?.status}
                </div>
                </div>}
                { data?.status==="Cancelled" &&
                  <div className=" bg-red-100 text-red-700 rounded-lg py-2 px-4 flex items-center gap-2">
                <FaTimesCircle className="" />
                <div className="">
                  {data?.status}
                </div>
                </div>}
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex flex-col gap-6">
              {
                state?.map((loc, i)=>(
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

                <img src="/loc.png" alt="" />
                <div className="flex flex-col gap-1">
                <div className="font-bold text-[16px] leading-[19px] text-[#232323]">{data?.states.slice(-1)[0]?.state}</div>
                {/* <div className="font-normal text-xs">Rd. Santa Ana, Illinois 85486 </div> */}
                </div>
            </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="grid grid-cols-2 rounded-b-[12px]">
              <div className="flex w-full items-center justify-center text-blue-700 font-bold cursor-pointer" onClick={()=>{
                open(true)
                edit(data?._id)
              }}>
                Edit
              </div>
              <div className="flex w-full items-center justify-center text-red-700 font-bold cursor-pointer" onClick={async()=>{
                await deleteRequest({
                  url: `/api/${data?._id}`
                }).then(res=>{
                  console.log(res, res?.data)
                  alert(res?.message)
                })
              }}>
                Delete
              </div>
            </div>
          </div>
  )
}
 