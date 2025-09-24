import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Loader from "./Loader"
import { toast, Slide } from 'react-toastify';
const BASE_API = import.meta.env.VITE_BASE_API;

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_API}/todos/`);
            const data = await res.json();
            // Sort by newest first
            const sortedTodos = data.todos.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setTodos(sortedTodos);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to fetch todos', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleDelete = async (_id) => {
        try {
            await fetch(`${BASE_API}/todos/delete/${_id}`, { method: "DELETE" });
            setTodos((prev) => prev.filter((todo) => todo._id !== _id));
            toast.success('Todo deleted successfully', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } catch (err) {
            setError(err.message);
            toast.error('Failed to delete todo', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };

    if (loading) return <Loader />
    if (error) return <div role="alert" aria-live="assertive" className="text-center p-4 text-red-600">Something went wrong. Please try again later.</div>

    return (
        <div className="p-4 relative">
            {/* Add Todo Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-4">
                {/* Heading */}
                <h5 className="  sm:text-sm  md:text-base lg:text-lg font-bold text-gray-800 mb-3 sm:mb-0">
                    My Todos
                </h5>

                {/* Add Todo Button */}
                <button
                    onClick={() => {
                        setSelectedTodo(null);
                        setShowForm(true);
                    }}
                    className="px-2 sm:px-2 sm:py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
                >
                    + Add Todo
                </button>
            </div>




            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 sm:text-sm  md:text-base lg:text-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 md:px-4 py-2">S-No.</th>
                            <th className="border px-2 md:px-4 py-2">Title</th>
                            <th className="border px-2 md:px-4 py-2">Status</th>
                            <th className="border px-2 md:px-4 py-2">Priority</th>
                            <th className="border px-2 md:px-4 py-2">Description</th>
                            <th className="border px-2 md:px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, i) => (
                            <tr key={todo._id} className="hover:bg-gray-50">
                                <th className="border px-2 md:px-4 py-2">{i + 1}</th>
                                <td className="border px-2 md:px-4 py-2">{todo.title}</td>
                                <td className="border px-2 md:px-4 py-2">{todo.status}</td>
                                <td className="border px-2 md:px-4 py-2">{todo.priority}</td>
                                <td className="border px-2 md:px-4 py-2">{todo.description}</td>
                                <td className="border px-2 md:px-4 py-2 flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                                    <button
                                        onClick={() => {
                                            setSelectedTodo(todo);
                                            setShowForm(true);
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup Form with background blur */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blurred overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
                        onClick={() => setShowForm(false)}
                    ></div>

                    {/* Form container */}
                    <div className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg p-4">
                        <TodoForm
                            todo={selectedTodo}
                            onSuccess={() => {
                                fetchTodos();
                                setShowForm(false);
                                setSelectedTodo(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
