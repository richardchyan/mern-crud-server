import mongoose from 'mongoose';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import Todo from './Models/todo.js';

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true}));

const PORT = 4000;

const DBCONNECT = 'mongodb+srv://richard:test123@cluster0.oljbq.mongodb.net/mern-crud?retryWrites=true&w=majority'

mongoose.connect(DBCONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
   }))
   .catch(error => {
      console.log(error);
   })

// NETNINJA TUTORIAL BLOG ROUTES

// app.post('/', (req, res) => {

//    console.log(req.body);

// })


//MERN TUTORIAL german guy
const router = express.Router();

// Middleware that says start with the default /todos prefix in front of every route, and then append each route's name from the get request to the default route. 

app.use('/todos', router)

// list of all todos
router.get('/', (req, res) => {

   Todo.find()
      .then(result=> {
         res.send(result)
      })
      .catch(error => {
         console.log(error);
      })
})

// single specific
router.get('/:id', (req, res) => {

   let id = req.params.id;
   Todo.findById(id)
      .then(result=> {
         res.send(result)
      })
      .catch(error => {
         console.log(error);
      })
})

// Creating a single post
router.post('/add', (req, res) => {

   let todo = new Todo(req.body);

   todo.save()
      .then(result => {
         res.status(200).json({ 'todo': 'success'})
      })
      .catch(error => {
         res.status(400).send('adding todo failed')
      })
})

// Editing a post
router.route('/update/:id').post((req, res) => {

   const { id } = req.params;
   const body = req.body;

   Todo.findByIdAndUpdate(id, body, {new : true})
      .then(result => {
         res.json('todo updated')
      })
      .catch(error => console.log(error));

   // Todo.findById(id, (error, result) => {
   //    if(!result){
   //       res.status(404).send('data is not found');
   //    } else {
   //       result.title = req.body.title;
   //       result.description = req.body.description;
   //       result.importance = req.body.importance;
   //       result.completed = req.body.completed;
   //    }

   //    result.save()
   //       .then(todo => {
   //          res.json('Todo updated!')
   //       })
   //       .catch(error => {
   //          res.status(400).send('Update failed');
   //       })
   // })
})

// Delete a post 

router.delete('/delete/:id', (req, res) => {

   const { id } = req.params

   Todo.findByIdAndDelete(id) 
      .then(result => res.send(result))

})



// SANDBOX TEST ROUTES 
// app.get('/', (req, res) => {

//    const todo = new Todo({

//       title: 'taking a shower', 
//       description: 'taking a shower',
//       importance: 'high',
//       completed: false,

//    });

//    todo.save()
//       .then(result => {
//          res.send(result);
//       })
//       .catch(error => {
//          console.log(error);
//       })
// })

// app.get('/alltodos', (req, res) => {

//    Todo.find()
//       .then(result => {
//          res.send(result);
//       })
//       .catch(error =>{
//          console.log(error);
//       })

// });

// app.get('/single-todo', (req, res) => {

//    Todo.findById('6112d1565e648a3630e5ec84')
//       .then(result => {
//          res.send(result);
//       })
//       .catch(error => {
//          console.log(error);
//       })
// });