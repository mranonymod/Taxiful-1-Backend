const express = require("express");
const session = require("express-session");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


require("./routes/auth");
const driver = require("./routes/driver");
const rider = require("./routes/rider");
const ride = require("./routes/ride");

const db = require("./config/db");

db();

const fn = () => console.log("listening");

app.use("/api/driver",driver);
app.use("/api/rider", rider);
app.use("/api/ride", ride);


app.listen(process.env.PORT || 5000, fn);

