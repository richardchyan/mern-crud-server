import Todo from '../models/todo.js';

const getAllTodos = (req, res) => {
   
   Todo.find()
      .then(result=> {
         res.send(result)
      })
      .catch(error => {
         console.log(error);
      })
}


const getSingleTodo = (req, res) => {

   let id = req.params.id;
   Todo.findById(id)
      .then(result=> {
         res.send(result)
      })
      .catch(error => {
         console.log(error);
      })

}

const createTodo = (req, res) => {

   const todo = req.body;

   const newTodo = new Todo({ ...todo, creator: req.userId});

   newTodo.save()
      .then(result => {
         res.status(200).json({ 'todo': 'success'})
      })
      .catch(error => {
         res.status(400).send('adding todo failed')
      })
}

const editTodo = (req, res) => {

   const { id } = req.params;
   const body = req.body;

   Todo.findByIdAndUpdate(id, body, {new : true})
      .then(result => {
         res.json('todo updated')
      })
      .catch(error => console.log(error));
}

const deleteTodo = (req, res) => {
   const { id } = req.params

   Todo.findByIdAndDelete(id) 
      .then(result => res.send(result))

}

export { getAllTodos, getSingleTodo, createTodo, editTodo, deleteTodo };