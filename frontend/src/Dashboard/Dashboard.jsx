// Dashboard.jsx

import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Input, Space, Button, Tooltip, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableComp from "../Table/TableComp";
import AddTeacher from "../AddTeacher/AddTeacher";
import axios from "axios";

const Dashboard = ({ data, setData, onUpdate }) => {
  const { Search } = Input;
  const [searchValue, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (value) => {
    setSearch(value);
    handleSearch(value);
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.post(
        "https://teacher-management-backend.vercel.app/api/teachers/search",
        {
          searchValue: value,
        }
      );
      setFilteredData(response.data);
    } catch (error) {
      message.error("Error searching teachers: " + error.message);
    }
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(data);
    } else {
      handleSearch(searchValue);
    }
  }, [data, searchValue]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://teacher-management-backend.vercel.app/api/teachers/getTeachers"
      );
      setData(response.data);
    } catch (error) {
      message.error("Error fetching data: " + error.message);
    }
  };
  const clearSearch = () => {
    setSearch("");
    setFilteredData(data);
    fetchData();
  };

  const [addTeacher, setAddTeacher] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  return (
    <div className="DashboardContainer">
      <div className="">
        <span className="fontBold">DASHBOARD</span>
        <br />
        <br />
        <div className="SearchContainer">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Search
              placeholder="Search..."
              className="HeaderSearch"
              allowClear
              onChange={(e) => onSearch(e.target.value)}
              onSearch={() => handleSearch(searchValue)}
              value={searchValue}
              size="large"
            />
            <div className="filterBtn">
              <Tooltip title="Add new teacher">
                <Button
                  className="AddTeacherButton"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setAddTeacher(true);
                  }}
                >
                  ADD
                </Button>
              </Tooltip>
              <Button onClick={clearSearch}>Clear Filter</Button>
            </div>
          </Space>
        </div>
        <TableComp
          data={filteredData}
          setData={setData}
          setEditVisible={setEditVisible}
          editVisible={editVisible}
          onUpdate={onUpdate}
        />
        {addTeacher && (
          <AddTeacher setAddTeacher={setAddTeacher} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
