
const { todoModel } = require("../Model/todo.model");
const express = require("express");
const mongoose = require("mongoose");

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo updated successfully", todo });
    }
    catch (err) {
        return res.status(500).json({ message: "Error while updating todo", error: err.message });
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo deleted successfully", todo });
    }
    catch (err) {
        return res.status(500).json({ message: "Error while deleting todo", error: err.message });
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo fetched successfully", todo });
    }
    catch (err) {
        return res.status(500).json({ message: "Error while fetching todo", error: err.message });
    }
}

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoModel.find();
        return res.status(200).json({ message: "Todos fetched successfully", todos });
    }
    catch (err) {
        return res.status(500).json({ message: "Error while fetching todos", error: err.message });
    }
}

const createNewTodo = async (req, res) => {
    try {
        let todos;
        if (Array.isArray(req.body)) {
            let titles = req.body.map((todo) => todo.title)
            const isTodo = await todoModel.find({ title: { $in: titles } });
            if (isTodo) {
                return res.status(400).json({ message: "Todo with this title already exists" });
            }
            todos = await todoModel.insertMany(req.body);
        }
        else {
            const isExists = await todoModel.findOne({ title: req.body.title });
            if (isExists) {
                return res.status(400).json({ message: "Todo with this title already exists" });
            }
            const todo = await todoModel.create(req.body);
            todos = [todo];
        }

        return res.status(201).json({ message: "Todo added successfully", todos });
    }
    catch (err) {
        return res.status(500).json({ message: "Error while adding todo", error: err.message });
    }
}

module.exports = { updateTodo, deleteTodoById, getTodoById, getAllTodos, createNewTodo };