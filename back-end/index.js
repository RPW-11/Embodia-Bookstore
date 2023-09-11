const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const port = require("./config/config").port;
const cors = require("cors");
const { requireAuth } = require("./app/middlewares/authMiddleware");

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's domain
    credentials: true,
};


// Routes
const authRoutes = require("./app/routes/authRoutes");
const bookRoutes = require("./app/routes/bookRoutes");
const userRoutes = require("./app/routes/userRoutes");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/user", requireAuth, userRoutes);
app.get("/", requireAuth, (req, res) => {
    res.json({message: "Hello friends!"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

