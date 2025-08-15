const express = require("express");
const jobRoutes = require("./routes/jobs.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const dbConfig = require("./config/db.config");
const profileRoutes = require("./routes/profile.routes");
const cors = require("cors");
const getUserInfo = require("./controllers/info.controller");
// const ImageKit = require('imagekit');
// const getRecommendation = require('./controllers/ai.controller');

dotenv.config();

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_API_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URI_ENDPOINT,
// });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // frontend ka origin
    credentials: true // cookies allow
}));
app.use(cookieParser());
dbConfig();
app.use("/api/v1", authRoutes);
app.use("/api/v1", jobRoutes);
app.use("/api/v1", profileRoutes);
app.get("/", (req, res) => {
  res.send({ message: "Hello World! This is opportune." });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
