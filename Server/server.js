const express = require('express');

const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const { ConnnectDB } = require('./Config/db');
const { todoRouter } = require('./Router/todo.route');
// middlewares
app.use(express.json()); // to parse json data
app.use(cors({
    origin: [
        "https://todo-neon-nine-19.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true
}))

// healthy check
app.get("/health", (req, res) => {
    try {
        return res.status(200).json({ message: "Server is healthy" });
    }
    catch (err) {
        return res.status(500).json({ message: "Server is not healthy" });
    }
})

// todo rouer
app.use("/", todoRouter);



// Listener
app.listen(PORT, () => {
    ConnnectDB();
    console.log(`Server is running at PORT ${PORT}`);
});


