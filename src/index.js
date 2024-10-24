import express from "express";
import httpstatus from "http-status";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./dbConnection/connection.js";
import colors from "colors";
import userRoute from "./routes/usersRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import bodyParser from "body-parser";

//Create an instance of Express server
const app = express();
dotenv.config();

const { PORT } = process.env;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
// app.use("/api/books", booksRoute);

app.get("/", (req, res) => {
  res.status(httpstatus.OK).json({
    status: "success",
    message: "Welcome to my e-library web application server!",
  });
});

dbConnection()
  .then(() => {
    console.log("Database connection successful".bgGreen);
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`.bgBlue);
    });
  })
  .catch((error) => { 
    console.log(`Error: ${error}`.bgRed);
  });
