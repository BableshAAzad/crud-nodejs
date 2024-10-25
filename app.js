const User = require("./models/User.js")
const mongoose = require("mongoose")
const express = require("express")

const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/crud_mydb',
  //  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get("/find-by-email", async (req, resp) => {
  let { email } = req.body
  const user = await User.findOne({ email: email }).select('-password')
  if (user) {
    resp.status(200).send(user)
  } else {
    resp.status(500).send({ "Message": "User Not Found " })
  }
})

app.post("/save", async (req, resp) => {
  let { email, name, password, address } = req.body
  const user = new User({
    name: name,
    email: email,
    password: password,
    address: address
  })
  try {
    await user.save();
    resp.status(201).send({ "status": "success", "message": "Registration Success" })
  } catch (error) {
    resp.status(500).send({ "status": "failed", "message": "Unable to Register" })
  }
})


app.post("/update-user/:userId", async (req, resp) => {
  let { email, name, password, address } = req.body
  let { userId } = req.params
  console.log(userId)
  let user = User.findById(userId)
  if (user) {
    await User.findByIdAndUpdate(userId, {
      $set: {
        name: name,
        email: email,
        password: password,
        address: address
      }
    })
    resp.status(200).send({ "status": "success", "message": "Update done Success" })
  } else {

  }
  try {
  } catch (error) {
    resp.status(500).send({ "status": "failed", "message": "Unable to Register" })
  }
})


app.listen(5000)