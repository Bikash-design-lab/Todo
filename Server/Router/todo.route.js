const express = require('express');

const router = express.Router();

const { todoModel } = require("../Model/todo.model");
const { updateTodo, deleteTodoById, getTodoById, getAllTodos, createNewTodo } = require("../Controller/todo.controller");

router.post("/add", createNewTodo);

router.get("/", getAllTodos);

router.get("/:id", getTodoById);

router.patch("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodoById);

module.exports = { router };