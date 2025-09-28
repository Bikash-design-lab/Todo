const express = require('express');

const todoRouter = express.Router();

const { todoModel } = require("../Model/todo.model");
const { updateTodo, deleteTodoById, getTodoById, getAllTodos, createNewTodo } = require("../Controller/todo.controller");

todoRouter.post("/todos/add", createNewTodo);

todoRouter.get("/todos", getAllTodos);

todoRouter.get("/todos/:id", getTodoById);

todoRouter.patch("/todos/update/:id", updateTodo);

todoRouter.delete("/todos/delete/:id", deleteTodoById);

module.exports = { todoRouter };