const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const articleRoute = require("./routes/articleRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/", authRoute);
app.use("/api", articleRoute);
app.use("/api/users", userRoute);

mongoose.set("strictQuery", false);
const url = process.env.MONGO_URL;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend server is up at ${port} `);
});
