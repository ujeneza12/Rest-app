import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Validation from "./SigninValidation";
import axios from "axios";

export default function Employee() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    serialNumber: "",
    model: "",
    manufacturer: "",
    department: "",
    nationalID: "",
    position: "",
    telephone: "",
    email: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/auth/employee-signin", values)
        .then((res) => {
          if (res.status === 200) {
            navigate('/dashboard');
          } else {
            alert("record not created successfully");
          }
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "firstname", type: "text", placeholder: "Enter Firstname" },
              { name: "lastname", type: "text", placeholder: "Enter Lastname" },
              { name: "nationalID", type: "number", placeholder: "Enter National ID" },
              { name: "telephone", type: "number", placeholder: "Enter Telephone" },
              { name: "email", type: "email", placeholder: "Enter Email" },
              { name: "department", type: "text", placeholder: "Enter Department" },
              { name: "position", type: "text", placeholder: "Enter Position" },
              { name: "manufacturer", type: "text", placeholder: "Enter Manufacturer" },
              { name: "model", type: "text", placeholder: "Enter Model" },
              { name: "serialNumber", type: "number", placeholder: "Enter Serial Number" },

            ].map((input, index) => (
              <div key={index} className="mt-2">
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name={input.name}
                  onChange={handleInput}
                />
                {errors[input.name] && (
                  <span className="text-red-400 text-sm">{errors[input.name]}</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-10 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
