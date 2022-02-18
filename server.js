require("dotenv").config();
const path = require("path");
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const connectDB = require("./config/db");
const { nanoid } = require("nanoid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const Crypto = require("crypto");

//initializing db connection
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running...");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const razorpay = new Razorpay({
  key_id: "rzp_test_6nxP2p2M8T5UeD",
  key_secret: "9N6TTlgJHptWiVMM3eUZgayh",
});

app.post("/razorpay", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: nanoid(),
    };
    const response = await razorpay.orders.create(options);
    console.log(response);

    res.json({
      success: true,
      orderId: response.id,
      amount: response.amount,
      currency: response.currency,
    });
  } catch (error) {
    res.json({ success: false, errorMessage: error.message });
  }
});
app.post("/verification", (req, res) => {
  //do a validation
   
  const { orderId, paymentId, signature } = req.body;

  const shasum = Crypto.createHmac("sha256","9N6TTlgJHptWiVMM3eUZgayh");
  shasum.update(`${orderId}|${paymentId}`,);
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    return res.json({ success: false, message: "transaction failed!" });
  }

  res.json({ success: true, message: "order successfully placed!" });
});
