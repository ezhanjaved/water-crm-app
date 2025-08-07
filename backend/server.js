import express from 'express';
import cors from 'cors';
import myrouter from './routers/routing.js';
import authRouter from './routers/auth.js';

const port = 3000;
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: true,
    })
);

app.use("/router", myrouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    console.log("Hello, your Express Server is running");
    res.send("Server is running!");
})

app.listen(port, () => {
    console.log(`Server is running on the port: ${port}`);
})