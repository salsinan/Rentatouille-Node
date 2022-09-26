import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import itemsRoute from "./routes/items.js"

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
    } catch (err) {
        throw err;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected')
})

// middlewares
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/items", itemsRoute);

app.listen(5001, () => {
    connect()
    console.log('connected to backend.')
})