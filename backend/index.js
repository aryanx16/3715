const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    console.log("server running perfectly..")
    res.send("server running successfully")
})
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/questions', require('./routes/questionroutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
