import users from '@/pages/api/auth/users'
import axios from 'axios'
import React, { cache } from 'react'
import { useToasts } from 'react-toast-notifications'
import Button from './Button'
import LoginInput from './LoginInput'
import Modal from './Modal'
import { DeliveryState, postRequest, putRequest } from './state'
import { useMutation, useQueryClient } from 'react-query'

export default function AddUser({users, open, setOpen}) {
  
    const [state, setState] = React.useState({
    email: "",
    personal_code: "",
    personal_code_hash: "",
    first_name: "",
    last_name: "",
    initials: "",
    location: "",
        number: "",
        product: "",
        start_location: "",
        end_location: "",
        _id: "",
        state:"",
        shipmentId:"",
        userId:""
})
      const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setState({
        ...state,
        [e.target.id]: e.target.value
    })
  }
  const { addToast } = useToasts()

  const [formType, setFormType] = React.useState("")
  const handleFormType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value)
  }
  const cache = useQueryClient()
      const { mutate } = useMutation(postRequest, {
      onSuccess(data) {
        addToast(data?.message, {
                        appearance: "success",
                        autoDismiss: true,
                      });
        cache.invalidateQueries();
      },
    });
  const handleSubmit = () => {
    const data = {
      email: state.email,
    first_name: state.first_name,
    last_name: state.last_name,
    initials: `${state.first_name.slice(0,1)}${state.last_name.slice(0,1)}`,
    location: state.location,
      product: state.product,
      start_location: state.start_location,
      end_location: state.end_location,
      state: DeliveryState[0]
    }
    formType==="Existing" ? mutate({
      url:"/api/auth/addShipment", data:{
      product: state.product,
      start_location: state.start_location,
      end_location: state.end_location,
    userId: state._id
    }
    })
    :
    mutate({
      url:"/api/auth/create", data
    })
  }
  return (
    <Modal open={open} setOpen={setOpen}>
          <div className="text-dark text-[24px] leading-[36px] font-semibold pb-2">
            Add A New Shipment
          </div>
          <div className=" font-[400] text-sm text-subtext pb-8">
            Add to existing or new client
          </div>
          <div className="flex flex-col pt-5 pb-9 gap-6">
            <select onChange={handleFormType} id={'formType'} name={'formType'} className='w-full rounded-lg bg-[#F0EFFF] placeholder-[#A7A3FF] text-[#A7A3FF] px-6 py-5 outline-none' required>
              <option value="">Please Select Client type</option>
              <option value="New Client">New Client</option>
              <option value="Existing">Existing</option>
            </select>
            {
              formType==="New Client" && <>
              <LoginInput placeholder={"Email Address"} id={"email"} change={handleChange} type={"email"}/>
              <div className="grid grid-cols-2 gap-2">
              <LoginInput placeholder={"First Name"} id={"first_name"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Last Name"} id={"last_name"} change={handleChange} type={""}/>
              </div>
              <LoginInput placeholder={"Client's Address or Location"} id={"location"} change={handleChange} type={""}/>
              </>
            }
            {
              formType==="Existing" && <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setState({
                ...state,
                _id: e.target.value
              })}} id={'_id'} name={'formType'} className='w-full rounded-lg bg-[#F0EFFF] placeholder-[#A7A3FF] text-[#A7A3FF] px-6 py-5 outline-none' required>
              <option value="">Please Choose Client</option>
              {
                users?.map((user, i)=>(
                  <option key={i} value={user._id}>{user.first_name} {user.last_name}</option>
                ))
              }
            </select>
            }
              <hr className='bg-[#F0EFFF]' />
              <LoginInput placeholder={"Product To Be Shipped"} id={"product"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Delivery Start Location"} id={"start_location"} change={handleChange} type={""}/>
          </div>
          <Button
            value="Start Delivery"
            click={handleSubmit}
          />
        </Modal>
  )
}
