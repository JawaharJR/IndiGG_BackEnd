const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Jawahar:RKqu1ho8TwiCm3gw@cluster0.nhzbfdy.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/participants", require("./routes/participantRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});
