import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';
const app = express();
dotenv.config();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/todos', todosRoutes)
const mongodb = "mongodb+srv://johntho:janetho@cluster0.pment.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.get('/', (req, res) => {
    res.send("welcome to server");
})
const PORT = process.env.PORT || 5000;
mongoose.connect(mongodb, { useUnifiedTopology: true}).then(() => 
console.log(`server is running on port ${PORT}`)).catch(err => console.log(err))

app.listen(PORT)