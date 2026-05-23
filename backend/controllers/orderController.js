import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import { io } from "../server.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// place order
const placeOrder = async (req, res) => {

  try {

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,

      // 🔥 IMPORTANT FIX
      orderId: newOrder._id,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });

  }
};

// verify order
const verifyOrder = async (req, res) => {

  const { orderId } = req.body;

  try {

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    // payment success
    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
    });

    // 🔥 clear cart
    await userModel.findByIdAndUpdate(
      order.userId,
      {
        cartData: {},
      }
    );

    res.json({
      success: true,
      message: "Payment Successful",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });

  }
};

// user orders
const userOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({
      userId: req.body.userId,
    });

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });

  }
};

// list orders
const listOrders = async (req, res) => {

  try {

    let userData = await userModel.findById(req.body.userId);

    if (userData && userData.role === "admin") {

      const orders = await orderModel.find({});

      res.json({
        success: true,
        data: orders,
      });

    } else {

      res.json({
        success: false,
        message: "You are not admin",
      });

    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });

  }
};

// update order status
const updateStatus = async (req, res) => {

  try {

    let userData = await userModel.findById(req.body.userId);

    if (userData && userData.role === "admin") {

      await orderModel.findByIdAndUpdate(
        req.body.orderId,
        {
          status: req.body.status,
        },
        { new: true }
      );

      if (req.body.orderId) {

        io.to(req.body.orderId.toString()).emit(
          "orderStatusUpdated",
          {
            orderId: req.body.orderId,
            status: req.body.status,
          }
        );
      }

      res.json({
        success: true,
        message: "Status Updated Successfully",
      });

    } else {

      res.json({
        success: false,
        message: "You are not an admin",
      });

    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });

  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};