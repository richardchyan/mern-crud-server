import mongoose from 'mongoose';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import router from './routes/todoRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(json());
app.use(urlencoded({ extended: true}));
app.use(cors());

// Middleware that says start with the default /todos prefix in front of every route, and then append each route's name from the get request to the default route. 

app.use('/todos', router);

// the greeting page for the deployed heroku server
app.get('/', (req, res) => {
   res.send('Hello, this is the todos API');
})

const PORT = process.env.PORT;

// const DBCONNECT = 'mongodb+srv://richard:test123@cluster0.oljbq.mongodb.net/mern-crud?retryWrites=true&w=majority';

mongoose.connect(process.env.DBCONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
   }))
   .catch(error => {
      console.log(error);
   })

