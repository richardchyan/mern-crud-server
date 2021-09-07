import express from 'express';
import { getAllTodos, getSingleTodo, createTodo, editTodo, deleteTodo } from '../controllers/todoController.js';
const router = express.Router();
import authenticateToken from '../middleware/auth.js';

// list of all todos
router.get('/', authenticateToken, getAllTodos);

// single specific
router.get('/:id', getSingleTodo);

// Creating a single post
router.post('/add', authenticateToken, createTodo);

// Editing a post
// router.route('/update/:id').post(editTodo);
router.patch('/update/:id', authenticateToken, editTodo);

// Delete a post 

router.delete('/delete/:id', authenticateToken, deleteTodo);

export default router;