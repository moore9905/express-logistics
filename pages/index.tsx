/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {CgSpinnerTwo} from "react-icons/cg"

export default function Home() {
  return (
    <div className='min-h-screen w-full' style={{
      backgroundImage: "url(/map.png)"
    }}>
      <div className="min-h-screen bg-transparent backdrop-blur-[5px]  w-full pt-8 md:px-10 px-6">
      <Link href="/">
        <img src='/logo.png' alt='' className='' />
      </Link>
      <div className="pt-7">
        <div className=" font-bold text-xl pb-5">Ongoing Delivery</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {
            ["","","","",""].map((del, i)=>(
          <div key={i} className="p-5 flex flex-col bg-white shadow-md rounded-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-[#B0B0B0] font-semibold text-sm pb-[6px]">Shipment number</div>
                <div className="pb-[10px] font-bold text-lg text-[#232323">EV-2017002346</div>
                <div className="font-normal text-sm text-[#484a58]">Food Materials</div>
              </div>
              <div className="">
                <img src="/truck.png" alt="" />
              </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex items-center gap-5">
              <div className="font-normal text-[#484a58]">Status:</div>
              <div className=" bg-amber-100 text-amber-700 rounded-lg py-2 px-4 flex items-center gap-2">
                <CgSpinnerTwo className=" animate-spin" />
                <div className="">
                  Pending
                </div>
                </div>
            </div>
            <hr className="bg-[#ececec] my-5" />
            <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <img src="/location.png" alt="" />
                <div className="flex flex-col gap-1">
                <div className="font-bold text-[16px] leading-[19px] text-[#232323]">2972 Westheimer </div>
                <div className="font-normal text-xs">Rd. Santa Ana, Illinois 85486 </div>
                </div>
            </div>
            <div className="flex items-center gap-4">

                <img src="/loc.png" alt="" />
                <div className="flex flex-col gap-1">
                <div className="font-bold text-[16px] leading-[19px] text-[#232323]">2972 Westheimer </div>
                <div className="font-normal text-xs">Rd. Santa Ana, Illinois 85486 </div>
                </div>
            </div>
            </div>
          </div>
            ))
          }
        </div>
      </div>
    </div>
    </div>
  )
}
