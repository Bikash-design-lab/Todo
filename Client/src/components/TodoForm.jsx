import React, { useState, useEffect } from "react";

const BASE_API = import.meta.env.VITE_BASE_API;

const TodoForm = ({ todo, onSuccess }) => {
    const [todoData, setTodoData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "",
    });

    // Prefill form when editing
    useEffect(() => {
        if (todo) {
            setTodoData({
                title: todo.title,
                description: todo.description,
                status: todo.status,
                priority: todo.priority,
            });
        }
    }, [todo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = BASE_API + "/todos/add";
            let method = "POST";

            if (todo) {
                url = `${BASE_API}/todos/update/${todo._id}`;
                method = "PATCH";
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todoData),
            });

            if (!res.ok) throw new Error("Something went wrong!");

            onSuccess(); // Refresh list & close form
            setTodoData({ title: "", description: "", status: "Pending", priority: "" });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4">
                {todo ? "Update Todo" : "Add New Todo"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={todoData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-2 sm:px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={todoData.description}
                    onChange={handleChange}
                    rows={3} // initial height
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                    style={{ maxHeight: "300px", minHeight: "60px" }}
                />

                <select
                    name="status"
                    value={todoData.status}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                </select>

                <input
                    type="text"
                    name="priority"
                    placeholder="Priority"
                    value={todoData.priority}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md text-sm sm:text-base md:text-lg hover:bg-blue-700 transition"
                >
                    {todo ? "Update Todo" : "Add Todo"}
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
