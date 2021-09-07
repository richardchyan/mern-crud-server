import mongoose from 'mongoose';

// format for multiple properties on each field

// const todoSchema = new Schema({
//    title: {
//       type: String,
//       required: true,
//    }
// })

const todoSchema = mongoose.Schema({

   title: String,
   description: String,
   importance: String,
   completed: Boolean,
   creator: String,

}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;