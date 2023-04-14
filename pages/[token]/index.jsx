import React from 'react'
import Modal from '@/components/Modal'
import LoginInput from '@/components/LoginInput'
import Button from '@/components/Button'
import axios from 'axios'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { CgSpinnerTwo } from 'react-icons/cg'
import DEliCard from '@/components/DEliCard'
import AddUser from '@/components/AddUser'
import UpdateDelivery from '@/components/Update'
import { getRequest } from '@/components/state'
import { Router, useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Redirect from '../redirect'
export default function Index() {
  const {token} = useRouter().query
  const router = useRouter()
  const fetchPeople = async () =>  {
   const res = await axios.get(`/api/auth/users`)
    return res.data
  }
  const {data} = useQuery(["people"], ()=>fetchPeople(), {
    keepPreviousData : true
  })
  const {data:deliveries} = useQuery(["deliveries"], async ()=> await getRequest({
    url: "/api/deliveries"
  }))
  const [users, setUsers] = React.useState(data?.data)
  React.useEffect(()=>{
    setUsers(data?.data)
  },[data?.data])
  const [admin, setAdmin] = React.useState(token ? jwtDecode(token) : null)
  React.useEffect(()=>{
    setAdmin(token ? jwtDecode(token) : null)
  },[token])
  const [delis, setDelis] = React.useState(deliveries?.data)
  React.useEffect(()=>{
    setDelis(deliveries?.data)
  },[deliveries?.data])
const [open, setOpen] = React.useState(false)
const [edit, setEdit] = React.useState(false)
const [userModal, setUserModal] = React.useState(null)
const [user, setUser] = React.useState(null)
React.useEffect(()=>{
  !edit && setUserModal(null)
  !edit && setUser(null)
},[edit])
React.useEffect(()=>{
  userModal!==null && setUser(
    delis?.find(u=> u.user._id!==userModal)
  )
},[delis, userModal, users])
let {0 : a ,length : l, [l - 2] : b} = [1,2,3,4,5,6,7,8,9,0];
console.log(a, b, [1,2,3,4,5,6,7,8,9,0].slice(0, [1,2,3,4,5,6,7,8,9,0].length-2))
  return (
    <>
    {
      admin?.isAdmin ?
      <div className="min-h-screen bg-white/75 backdrop-blur-[5px]  w-full pt-8 md:px-10 px-6">
      <Link href="/">
        <img src='/logo.png' alt='' className='' />
      </Link>
      <div className="w-full flex pt-7 pb-5 justify-between items-center">
        <div className=" font-bold text-4xl pb-5">Deliveries</div>
        <div className="">
        <Button
            value="Add Delivery"
            click={()=>{setOpen(true)}}
            />
            </div>
      </div>
        <AddUser users={users} open={open} setOpen={setOpen} />
        <UpdateDelivery user={user} open={edit} setOpen={setEdit} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {
            delis?.map((del, i)=>(
              <DEliCard key={i} data={del} open={setEdit} edit={setUserModal} />
              ))
          }
        </div>
    </div>
    :
    <Redirect/>
            }
              </>
  )
}
