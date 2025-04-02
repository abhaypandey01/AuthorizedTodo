import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import authservice from "./appwrite/services/authService";

const App = () => {

  useEffect(() => {
    const handleTabClose = async () => {
      await authservice.logout();
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-600'>
      <div className='w-full block'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
};

export default App;
