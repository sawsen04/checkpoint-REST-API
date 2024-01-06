const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "the name field is required"],
  },
  phone: Number,
  email: String,
});

module.exports = User = mongoose.model("users", userSchema);
