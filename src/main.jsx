import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from './App.jsx';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ProtectedLayout } from './components/index.js';
import AddTodo from "./pages/AddTodo.jsx";
import HomePage from "./pages/HomePage.jsx";
import ListTodos from "./pages/ListTodos.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: (
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <ProtectedLayout authentication={false}>
            <Signup />
          </ProtectedLayout>
        )
      },
      {
        path: "/add-todo",
        element: (
          <ProtectedLayout authentication>
            {""}
            <AddTodo />
          </ProtectedLayout>
        )
      },
      {
        path: "/list-todos",
        element: (
          <ProtectedLayout authentication>
            {""}
            <ListTodos />
          </ProtectedLayout>
        )
      },
    ]
  }
]) 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
