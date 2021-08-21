import express from 'express';
import { getAllTodos, getSingleTodo, createTodo, editTodo, deleteTodo } from '../controllers/todoController.js';
const router = express.Router();

// list of all todos
router.get('/', getAllTodos);

// single specific
router.get('/:id', getSingleTodo);

// Creating a single post
router.post('/add', createTodo);

// Editing a post
// router.route('/update/:id').post(editTodo);
router.patch('/update/:id', editTodo);

// Delete a post 

router.delete('/delete/:id', deleteTodo);

export default router;