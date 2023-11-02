require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.URL;
const connect = mongoose.connect(
  "mongodb+srv://VIMAN:w0wBuEBY4UX8ESou@galaxycluster.jrkkwkd.mongodb.net/login"
);
connect
  .then(() => {
    console.log("Database is connected");
  })
  .catch(() => {
    console.log("Unable to connect Database");
  });
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("users", userSchema);

const contactUsSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add email validation here
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = { ContactUs, collection };
