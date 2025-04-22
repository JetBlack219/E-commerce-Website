import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Validate required fields
        if (!userId || !items || !amount) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const orderData = {
            userId,
            items,
            amount,
            address: address || {},
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            status: "Order Placed"
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        
        res.json({ success: true, message: "Order Placed", order: newOrder });

    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: error.message });
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

}

// User Order data for frontend
const userOrders = async(req, res) => {

}

//  Update Orders Status from Admin Panel
const updateStatus = async(req, res) => {

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}