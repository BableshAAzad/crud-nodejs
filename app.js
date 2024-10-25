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


app.put("/update-user/:userId", async (req, resp) => {
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
    resp.status(500).send({ "status": "failed", "message": "Unable to find user" })
  }
  try {
  } catch (error) {
    resp.status(500).send({ "status": "failed", "message": "Unable to update" })
  }
})

app.delete("/delete-user/:userId", async (req, resp) => {
  try {
    let user = await User.findByIdAndDelete(req.params.userId)
    if (user) return resp.status(200).send({ "message": "User is deleted" })
    return resp.status(400).send({ "message": "Data not found" })
  } catch (error) {
    return resp.status(400).send({ "message": "Data not found" })
  }
})


app.listen(5000)