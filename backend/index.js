const express = require('express');
const  connectToDb  = require('./db');
require('dotenv').config()

const app = express()
app.use(express.json());
const port = process.env.PORT;

var cors = require('cors')
app.use(cors())

// Connecting to db
connectToDb();

app.listen(port, () => {
  console.log(`Online watch store app listening on port ${port}`)
})

// Routes avaliable 
app.use("/watches", require("./routes/watches"));
app.use('/admin' , require("./routes/admin"));
app.use('/category', require('./routes/category'))