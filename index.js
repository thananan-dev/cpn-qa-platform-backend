require("dotenv").config();

const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const { connection, sequelize } = require("./config/database");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // หน่วยเวลาเป็น มิลลิวินาที ในนี้คือ 15 นาที (1000 มิลลิวินาที = 1 วินาที)
  max: 100, // จำนวนการเรียกใช้สูงสุดต่อ IP Address ต่อเวลาใน windowMS
  standardHeaders: true, // คืน rate limit ไปยัง `RateLimit-*` ใน headers
  legacyHeaders: false, // ปิด `X-RateLimit-*` ใน headers
});

const authenticationRouter = require("./routes/authenticationRouter");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const authorizationMiddleware = require("./middleware/authorizationMiddleware");

app.use(limiter);
app.use(express.json());

app.use("/api/auth", authenticationRouter);
app.use("/api/user", authorizationMiddleware.authorization, userRouter);
app.use("/api/post", authorizationMiddleware.authorization, postRouter);
app.use("/api/comment", authorizationMiddleware.authorization, commentRouter);

const PORT = 8000;

app.listen(PORT, () => {
  connection();
  sequelize.sync({ force: true }); // run once time for init database schema and tables
  console.log("Server is running on port: ", PORT);
});
