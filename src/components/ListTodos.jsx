import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todoSlice";
import Todo from "./Todo";

function ListAllTodos() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData); // Get logged-in user
    const todos = useSelector((state) => state.todos.todos); // Get todos from Redux store
    const loading = useSelector((state) => state.todos.loading); // Get loading state
    const error = useSelector((state) => state.todos.error); // Get error state

    const [localError, setLocalError] = useState("");

    useEffect(() => {
        if (user?.$id) {
            dispatch(fetchTodos(user.$id)).catch((err) => {
                setLocalError(err.message || "Failed to fetch todos.");
            });
        }
    }, [dispatch, user]);

    if (!user?.$id) {
        return (
            <div className="text-center text-red-500">
                <p>User not authenticated. Please log in to view your todos.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center text-white">
                <p>Loading your todos...</p>
            </div>
        );
    }

    if (error || localError) {
        return (
            <div className="text-center text-red-500">
                <p>{error || localError}</p>
            </div>
        );
    }

    if (!todos || todos.length === 0) {
        return (
            <div className="text-center text-white">
                <p>No todos found. Add a new todo to get started!</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Your Todos</h2>
            <ul className="space-y-4">
                {todos.map((todo) => (
                    <li key={todo.$id}>
                        <Todo todo={todo} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListAllTodos;