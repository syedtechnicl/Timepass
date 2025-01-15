import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Require",
      });
    }

    const todo = new Todo({ title, description });
    todo.save();
    return res.status(201).json({
      success: true,
      message: "todo created",
      todo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );
    await todo.save();
    return res.status(200).json({
      success: true,
      todo,
      message: "Todo Updated",
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findOneAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
