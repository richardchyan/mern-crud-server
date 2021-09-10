import mongoose from 'mongoose';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import router from './routes/todoRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(json({ extended: true}));
app.use(urlencoded({ extended: true}));
app.use(cors());

// routes

app.use('/todos', router);
app.use('/users', userRouter);

// the greeting page for the deployed heroku server
app.get('/', (req, res) => {
   res.send('Test message');
})

const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.DBCONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
   }))
   .catch(error => {
      console.log(error);
   })

