const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    trim: true, // remove empty string
    unique: true,
  },

  /**
   * different types of attributes
   */
  role: {
    type: Number,
    default: 0,
  },
  image: {
    image: String,
  },
  token: {
    type: String,
  },
  /**
   * token validation period
   */
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.export = { User };
