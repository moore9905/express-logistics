import mongoose from "mongoose";
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const StateSchema = new mongoose.Schema({
    shipmentId: ObjectId,
        index: Number,
        state: String,
})

const State = mongoose.models.State || mongoose.model('State', StateSchema);
export default State;