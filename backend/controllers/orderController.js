import orderModel from "../models/orderModel.js";
import Stripe from 'stripe';
import userModel from "../models/userModel.js";  // Fixed path and added .js extension

// Global Variables
const currency = 'USD';
const deliveryCharge = 10;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        if (!userId || !items || !amount || !address || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create new order with all data including address
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: paymentMethod.toUpperCase(),
            payment: paymentMethod.toLowerCase() === 'cod' ? false : true,
            date: Date.now()
        });

        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;
        const { origin } = req.headers;

        if (!userId || !items || !amount || !address || !paymentMethod || !origin) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: paymentMethod.toUpperCase(),
            payment: false, // Should be false initially for Stripe as payment is not confirmed yet
            date: Date.now()
        });

        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100) // Ensure proper rounding
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            metadata: {  // Add metadata for better tracking
                orderId: newOrder._id.toString(),
                userId: userId
            }
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    
    if (!orderId || success === undefined || !userId) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order cancelled" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    // Implementation needed
    res.status(501).json({ success: false, message: "Razorpay integration not implemented yet" });
};

// All Orders data for the admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });  // Changed 'orders' to 'data' for consistency
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// User Order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await orderModel.find({ userId });
        res.json({ success: true, data: orders });  // Changed 'orders' to 'data' for consistency
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Orders Status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe };