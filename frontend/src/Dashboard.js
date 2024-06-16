import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const filteredData = useMemo(() => {
    return userData.filter(user =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userData, searchQuery]);

  const subset = useMemo(() => {
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, startIndex, endIndex]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:8081/users");
      setUserData(result.data);
      setTotalPages(Math.ceil(result.data.length / itemsPerPage));
    } catch (err) {
      console.log("No record found");
    }
  };

  const handleCreateEmployee = () => {
    navigate('/employee');
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Information</h1>
        <button
          onClick={handleCreateEmployee}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Employee
        </button>
      </div>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search employee"
          className="border rounded-md p-3 focus:outline-none h-11 text-sm w-60"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Firstname</th>
            <th className="px-4 py-2">Lastname</th>
            <th className="px-4 py-2">National ID</th>
            <th className="px-4 py-2">Telephone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Manufacturer</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {subset.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border px-4 py-2">{user.ID}</td>
              <td className="border px-4 py-2">{user.firstname}</td>
              <td className="border px-4 py-2">{user.lastname}</td>
              <td className="border px-4 py-2">{user.NationalID}</td>
              <td className="border px-4 py-2">{user.telephone}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.department}</td>
              <td className="border px-4 py-2">{user.Position}</td>
              <td className="border px-4 py-2">{user.Manufacturer}</td>
              <td className="border px-4 py-2">{user.Model}</td>
              <td className="border px-4 py-2">{user.SerialNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={prevPageHandler}
        >
          Prev
        </button>
        <div className="flex space-x-2">
          {numbers.map((number) => (
            <span
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`cursor-pointer px-3 py-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
            >
              {number}
            </span>
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPageHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
}
