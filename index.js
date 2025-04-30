require("dotenv").config();
const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Add it back when communicating with react
const logger = require("morgan");

const app = express()

// Setting up cors
const allowedOrigins = ["https://eallistoenergies.com"];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};


// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));


// Import route handlers
const userRoutes = require("./routes/user");



// Test route for API health check
app.get("/api/test", (req, res) => {
    res.status(200).json({ data: "test route success" });
});


// Routes for actions
app.use("/api/user", userRoutes)



// Start the server without MongoDB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});