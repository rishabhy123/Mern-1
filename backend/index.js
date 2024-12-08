require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT;
const mongo = require('./database');
mongo();

app.get('/', (req, res) => {
  res.send('Hello World!')   
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const cors = require('cors');
app.use(cors());

  app.use(express.json());
  app.use("/api", require("./Routes/CreateUser"));
  app.use("/api", require("./Routes/LoginUser"));
  app.use("/api", require("./Routes/DisplayData"));
  app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})