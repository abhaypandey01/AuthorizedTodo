import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

const App = () => {

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
