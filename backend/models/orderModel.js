import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: String },
        country: { type: String },
        phone: { type: String }
    },
    status: { type: String, required: true, default: "Order Placed" },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true }
}, { versionKey: false }); 

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel
