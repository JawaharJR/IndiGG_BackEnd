const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
});

module.exports = mongoose.model("Participant", participantSchema);
