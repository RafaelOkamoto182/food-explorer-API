require("express-async-errors");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const AppError = require("./utils/AppError");

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
//credentials: mandatory to utilize cookies

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));