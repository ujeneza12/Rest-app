import React from "react";
import Login from "./Login";
import Employee from "./Employee";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


export default function  App(){

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
        </Routes>
          
        </BrowserRouter>
    )

}