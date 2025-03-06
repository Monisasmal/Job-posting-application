const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./route");

const app = express();

// for JSOn middleware
app.use(express.json());

// DB conectionon
const DB_URI = "mongodb+srv://manaswinisasmal5597:FJ7aPQtwOa7u8RGD@cluster0.drzd9.mongodb.net/";
mongoose.connect(DB_URI)
.then(() => console.log("DB connected sucessfully"))
.catch((err) => console.log("ERROR while connecting database", err));

// modular routes
app.use("/api/v1/job", jobRoutes);

const PORT = 5500;
app.listen(PORT, () => console.log(`Server is on and running at port ${PORT}`));