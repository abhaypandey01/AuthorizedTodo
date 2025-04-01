import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todoSlice";
import Button from "./Button";
import InputBox from "./InputBox";

function Todo({ todo }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userData?.$id); // Get logged-in user's ID
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);
    const [error, setError] = useState("");

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedText(todo.text);
    };

    const handleSave = async () => {
        if (!updatedText.trim()) {
            setError("Todo text cannot be empty.");
            return;
        }

        try {
            await dispatch(updateTodo({ todoId: todo.$id, updates: { text: updatedText } })).unwrap();
            setIsEditing(false);
        } catch (err) {
            setError(err.message || "Failed to update todo.");
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteTodo(todo.$id)).unwrap();
        } catch (err) {
            setError(err.message || "Failed to delete todo.");
        }
    };

    if (todo.userId !== userId) {
        return null; // Hide the todo if the logged-in user is not the owner
    }

    return (
        <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            {isEditing ? (
                <div className="flex-1">
                    <InputBox
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        placeholder="Update your todo"
                    />
                </div>
            ) : (
                <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-white"}`}>
                    {todo.text}
                </span>
            )}

            <div className="flex space-x-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            Save
                        </Button>
                        <Button onClick={handleCancel} className="bg-gray-600 hover:bg-gray-700">
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                            Edit
                        </Button>
                        <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </Button>
                    </>
                )}
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default Todo;