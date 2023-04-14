import axios from "axios"

export const DeliveryState = [
  "Package arrived at our Local Facility",
    "Package has left Courier Facility",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "In Customs"
]

export const postRequest = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
  const response = await axios.post(url, data)
  return response.data
}


export const getRequest = async ({ url } : {url: string}) => {
  const response = await axios.get(url)
  return response.data
}


export const putRequest = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
  const response = await axios.put(url, data)
  return response.data
}

export const patchRequest = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
  const response = await axios.patch(url, data)
  return response.data
}

export const deleteRequest = async ({ url } : {url: string}) => {
  const response = await axios.delete(url)
  return response.data
}