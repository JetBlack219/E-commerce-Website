import orderModel from "../models/orderModel.js";

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        // Create new order with all data including address
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address, // Make sure this is included
            paymentMethod: paymentMethod.toUpperCase(),
            payment: paymentMethod.toLowerCase() === 'cod' ? false : true,
            date: Date.now()
        });

        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Placing orders using Stripe Method
const placeOrderStripe = async(req, res) => {

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async(req, res) => {

}

// All Orders data for the admin panel
const allOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

// User Order data for frontend
const userOrders = async(req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//  Update Orders Status from Admin Panel
const updateStatus = async(req, res) => {

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}