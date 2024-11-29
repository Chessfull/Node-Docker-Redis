// ▼ Modules ▼
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
require('dotenv').config(); // -> For using env

const app = express();

// ▼ Middlewares ▼
app.use(express.json());

// ▼ MongoDB connection ▼
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection succesfull..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// ▼ Apply Routes ▼
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ▼ Server ▼
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
