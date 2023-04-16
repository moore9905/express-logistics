import users from '@/pages/api/auth/users'
import axios from 'axios'
import React from 'react'
import Modal from './Modal'
import { DeliveryState, postRequest, putRequest } from './state'
import { useQueryClient, useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'

export default function UpdateDelivery({user, open, setOpen}) {
    console.log(user, user?.states?.slice(-1)[0].state)
    const [state, setState] = React.useState({
        product: user?.product,
        start_location: user?.start_location,
        state:user?.states?.slice(-1)[0].state,
        shipmentId:user?._id,
        userId:user?.user._id,
        status: user?.status,
        end_location: user?.end_location
})
React.useEffect(()=>{
  open && setState({
        product: user?.product,
        start_location: user?.start_location,
        state:user?.states?.slice(-1)[0].state,
        shipmentId:user?._id,
        userId:user?.user._id,
        status: user?.status,
        end_location: user?.end_location
})
},[user, open])
      const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setState({
        ...state,
        [e.target.id]: e.target.value
    })
  }

  const [formType, setFormType] = React.useState("")
  const handleFormType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value)
  }
  const { addToast } = useToasts()
  const cache = useQueryClient()
      const { mutate } = useMutation(postRequest, {
      onSuccess(data) {
        addToast(data?.message, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpen(false)
        cache.invalidateQueries();
      },
    });
  const handleSubmit = () => {
    const data = {
      product: state.product,
      start_location: state.start_location,
      status: state.status
    }
    mutate({
      url:"/api/update_status", data
    })
  }
  return (
    <Modal open={open} setOpen={setOpen}>
          <div className="text-dark text-[24px] leading-[36px] font-semibold pb-2">
            Update Shipment
          </div>
          <div className=" font-[400] text-sm text-subtext pb-8">
            Update Status
          </div>
          
          <div className="flex flex-col pt-5 pb-9 gap-6">
            <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
              setState({
                ...state,
                status: e.target.value
              })
              mutate({url:'/api/update_status', data:{
                _id: user?._id,
                status: e.target.value,
              }})
            }}  id={'_id'} name={'formType'} className='w-full rounded-lg bg-[#F0EFFF] placeholder-[#A7A3FF] text-[#A7A3FF] px-6 py-5 outline-none' required>
              <option value="">Please Select Status</option>
              {
                ['Pending','Delivering','Cancelled', "Delivered"]?.map((del, i)=>(
                  <option key={i} value={del} selected={del===state.status}>{del}</option>
                ))
              }
            </select>
          </div>
          <div className=" font-[400] text-sm text-subtext pb-8">
            Update State
          </div>
          <div className="flex flex-col pt-5 pb-9 gap-6">
            <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
              mutate({url:'/api/update_state', data:{
                shipmentId: user?._id,
                state: e.target.value,
                index: user?.states?.slice(-1)[0].index + 1
              }})
            }} id={'_id'} name={'formType'} className='w-full rounded-lg bg-[#F0EFFF] placeholder-[#A7A3FF] text-[#A7A3FF] px-6 py-5 outline-none' required>
              <option value="">Please Select State</option>
              {
                DeliveryState?.map((del, i)=>(
                  <option key={i} value={del} selected={del===state.state}>{del}</option>
                ))
              }
            </select>
          </div>
          {/* <div className="flex flex-col pt-5 pb-9 gap-6">
              <ValueInput value={state.product} placeholder={"Product To Be Shipped"} id={"product"} change={handleChange} type={""}/>
              <ValueInput value={state.start_location} placeholder={"Delivery Start Location"} id={"start_location"} change={handleChange} type={""}/>
              <ValueInput value={state.end_location} placeholder={"Delivery End Location"} id={"end_location"} change={handleChange} type={""}/>
          </div> */}
          {/* <Button
            value="Update Delivery"
            click={handleSubmit}
          /> */}
        </Modal>
  )
}
