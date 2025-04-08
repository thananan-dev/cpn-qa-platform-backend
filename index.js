const express = require("express");
const app = express();
const rateLimit = require('express-rate-limit')
const { connection, sequelize } = require("./config/database");
const PORT = 8000;

// auth
// create post
// comment
// search (title, tag, date, popular)

const limiter = rateLimit({ 
    windowMs: 15 * 60 * 1000, // หน่วยเวลาเป็น มิลลิวินาที ในนี้คือ 15 นาที (1000 มิลลิวินาที = 1 วินาที)
    max: 100, // จำนวนการเรียกใช้สูงสุดต่อ IP Address ต่อเวลาใน windowMS
    standardHeaders: true, // คืน rate limit ไปยัง `RateLimit-*` ใน headers 
    legacyHeaders: false, // ปิด `X-RateLimit-*` ใน headers 
})

const authenticateService = require("./services/authentication");
const userService = require("./services/user");
const postService = require("./services/post");

app.use(limiter)
app.use(express.json());
app.use(authenticateService);
app.use(userService);
app.use(postService);

app.listen(PORT, () => {
  connection();
//   sequelize.sync({ force: true });
  console.log("Server is running on port: ", PORT);
});
