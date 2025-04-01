import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { Button, InputBox } from "./index";
import { useForm } from "react-hook-form";

function AddTodo() {

  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user.userData));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user?.$id) {
      setError("User not authenticated. Please Log In.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const sanitizedText = data.text.replace(/<[^>]*>?/gm, "");
      await dispatch(addTodo({
        text: sanitizedText,
        userId: user?.$id,
      })).unwrap();
      reset();
    } catch (error) {
      setError(error.message || "Failed to add todo.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold text-white mb-2">Add New Todo</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputBox
          label="Todo Text: "
          placeholder="Enter your task"
          className="text-gray-800"
          {...register("text", {
            required: "Todo text is required.",
            maxLength: {
              value: 100,
              message: "Todo text cannot exceed 100 characters.",
            },
          })}
          disabled={loading}
        />
        {errors.text && <p className="text-red-500">{errors.text.message}</p>}
        <Button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
          {loading ? "Adding.." : "Add Todo"}
        </Button>
      </form>
    </div>);
}

export default AddTodo;
