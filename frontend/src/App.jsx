import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Filter from "./Filter/Filter";
import Dashboard from "./Dashboard/Dashboard";
import { message } from "antd";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://teacher-management-backend.vercel.app/api/teachers/getTeachers"
      );
      setData(response.data);
      console.log(response)
    } catch (error) {
      message.error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (filters) => {
    try {
      const response = await axios.post(
        "https://teacher-management-backend.vercel.app/api/teachers/filter",
        filters
      );
      if (response.status == 200) {
        setData(response.data.data);
      } else {
        message.warning("Error while filtering the data...");
      }
    } catch (error) {
      message.error("Error filtering data: " + error.message);
    }
  };

  return (
    <div className="Container">
      <Header />
      <div className="Container2">
        <Filter data={data} onSearch={handleSearch} />
        <Dashboard data={data} setData={setData} onUpdate={fetchData} />
      </div>
    </div>
  );
}

export default App;
