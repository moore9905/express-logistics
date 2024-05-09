import axios from "axios"

export const DeliveryState = [
  "Departed from facility",
  "Clearance processing completed - Import",
  "Arrived at sort facility",
  "In clearance processing - Import",
  "International flight has arrived",
  "International flight has departed",
  "Package arrived at our Local Facility",
    "Package has left Courier Facility",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "In Customs",
    "In Transit",
    "Demurrage"
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