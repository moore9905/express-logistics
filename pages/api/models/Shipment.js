import mongoose from "mongoose";
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const ShipmentSchema = new mongoose.Schema({
    userId: ObjectId,
        number: String,
        product: String,
        sender: String,
        status: {
            type: String,
            default: "Pending"
        },
        start_location: String,
        end_location: String,
        created: {
            type: Date,
            default: Date.now()
        }
})

const Shipment = mongoose.models.Shipment || mongoose.model('Shipment', ShipmentSchema);
export default Shipment;