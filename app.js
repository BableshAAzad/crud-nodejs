const mongoose = require("mongoose")
const express = require("express")

const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/crud_mydb',
    //  { useNewUrlParser: true, useUnifiedTopology: true }
    )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.get("/", (req, resp)=>{
    resp.send("Hello Bablesh")
  })


app.listen(5000)