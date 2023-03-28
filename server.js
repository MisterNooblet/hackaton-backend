import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import UserRoute from "./routes/userRoutes.js";
import globalErrHandler from "./middlewares/globalErrHandler.js";
 dotenv.config({ path: "./config/config.env" });

//middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/user', UserRoute)
connectDB()

if (process.env.NODE_ENV !== `production`) {
    app.use(morgan(`dev`));
  }

  app.get("/", (req, res) =>
  res.status(200).json({ message: "server is running" })
);

// app.use('/api/v1/user', UserRoute)
// app.use('/api/v1/account', AccountRoute)
// app.use('/api/v1/transactions', TransactionsRoute)


//error handlers
app.use(globalErrHandler)


//Server Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

