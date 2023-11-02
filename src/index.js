const express = require("express");
const { ContactUs, collection }= require("./config");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/register", async (req, res) => {
  const data = {
    email: req.body.username,
    password: req.body.password,
  };
  const userExist = await collection.findOne({ email: req.body.username });
  if (userExist) {
    res.send("User already exists");
  } else {
    const userData = await collection.create(data);
    console.log(userData);
    res.redirect("/");

  }
});

app.post("/login", async (req, res) => {
  try {
    const findUser = await collection.findOne({ email: req.body.username });

    if (findUser) {
      const storedHashedPassword = findUser.password;

      // Compare the provided password with the stored hashed password
      const providedPassword = req.body.password;

      if (providedPassword==storedHashedPassword) {
        res.redirect("/");
      } else {
        res.send("Wrong Password");
      }
    } else {
      res.send("No user found");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error"); // You can customize the error response
  }
});
app.post('/contact', async (req, res) => {
  try {
    const { fullname, email, phone, message } = req.body;

    // Create a new Contact Us entry
    const newContactEntry = new ContactUs({
      fullname,
      email,
      phone,
      message,
    });

    // Save the entry to the database
    await newContactEntry.save();

    res.status(201).json({ message: 'Contact form entry saved' });
  } catch (error) {
    console.error('Error saving contact form entry:', error);
    res.status(500).json({ error: 'An error occurred while saving the contact form entry' });
  }
});


app.listen(4000, () => {
  console.log("Connection established on port 4000");
});
