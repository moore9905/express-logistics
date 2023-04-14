// import { MongoClient } from 'mongodb'

// const uri = "mongodb://127.0.0.1:27017/tracker"
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }

// let client
// let clientPromise

// // if (!process.env.ATLAS_URI) {
// //     throw new Error('Add Mongo URI to .env.local')
// // }

// if (process.env.NODE_ENV === 'development') {
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options)
//         global._mongoClientPromise = client.connect().then(()=>console.log("connection successful"))
//     }
//     clientPromise = global._mongoClientPromise
// } else {
//     client = new MongoClient(uri, options)
//     clientPromise = client.connect().then(()=>console.log("connection successful"))
// }

// export default clientPromise

import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tracker"

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

async function dbConnect () {

    return await mongoose.connect(MONGODB_URI).then(mongoose => {
        console.log("Mongoose Server connected Successfully")
      return mongoose
    })
}

export default dbConnect