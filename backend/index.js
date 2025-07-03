require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const dataRouter = require("./routes/dataRoute");
const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("connected to db successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

app.use(dataRouter);
app.use(userRouter);
