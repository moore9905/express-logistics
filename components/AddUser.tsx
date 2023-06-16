import users from '@/pages/api/auth/users'
import axios from 'axios'
import React, { cache } from 'react'
import Button from './Button'
import LoginInput from './LoginInput'
import Modal from './Modal'
import { DeliveryState, postRequest, putRequest } from './state'
import { useMutation, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'

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
        sender: "",
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
      })
      setOpen(false)
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
      sender: state.sender,
      start_location: state.start_location,
      end_location: state.end_location,
      state: DeliveryState[0]
    }
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
           
              <LoginInput placeholder={"Email Address"} id={"email"} change={handleChange} type={"email"}/>
              <div className="grid grid-cols-2 gap-2">
              <LoginInput placeholder={"First Name"} id={"first_name"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Last Name"} id={"last_name"} change={handleChange} type={""}/>
              </div>
              <LoginInput placeholder={"Client's Address or Location"} id={"location"} change={handleChange} type={""}/>
           
              <hr className='bg-[#F0EFFF]' />
              <LoginInput placeholder={"Product To Be Shipped"} id={"product"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Sender's Name"} id={"sender"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Delivery Start Location"} id={"start_location"} change={handleChange} type={""}/>
              <LoginInput placeholder={"Delivery Destination"} id={"end_location"} change={handleChange} type={""}/>
          </div>
          <Button
            value="Start Delivery"
            click={handleSubmit}
          />
        </Modal>
  )
}
