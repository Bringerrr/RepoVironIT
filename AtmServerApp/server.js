const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const atms = require("./routes/api/atm");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/atm", atms);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
