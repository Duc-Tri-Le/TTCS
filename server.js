const express = require("express")
const cors = require("cors");
const PORT = process.env.PORT || 80;
const app = express()
const bodyParser = require("body-parser");
const path = require("path");
const router = require('./routers')
//db connection
const db = require("./db.js");
db.connect();

//middleware
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json())

//header
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

//api
app.use('/api', router)

//static resources

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get('*',(req, res) =>{
   try
   { res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))}
   catch(e)
   {res.send('Welcome to stackoverflow clone')}
})

//cors
app.use(cors())

//server listen

app.listen(PORT, () => {
    console.log(`Stack Overflow Clone API is running on PORT No- ${PORT}`);
  })