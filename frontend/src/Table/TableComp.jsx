import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import "./TableComp.css";
import EditTeacher from "../editTeacher/EditTeacher";

const TableComp = ({
  data,
  setData,
  setEditVisible,
  editVisible,
  onUpdate,
}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form] = Form.useForm();

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleEdit = (record) => {
    console.log(record);
    setEditRecord(record);
    setEditVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      console.log(record._id);
      await axios.delete(
        `https://teacher-management-backend.vercel.app/api/teachers/delete/${record._id}`
      );
      message.success("User deleted successfully!");
      onUpdate();
    } catch (error) {
      message.error("Error deleting user: " + error.message);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEditRecord(null);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `https://teacher-management-backend.vercel.app/teachers/${editRecord._id}`,
        values
      );
      message.success("User updated successfully!");
      setVisible(false);
      setEditRecord(null);
      form.resetFields();
      fetchData(); // Refresh data after update
    } catch (error) {
      message.error("Error updating user: " + error.message);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: 100,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 100,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 75,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      width: 125,
    },
    {
      title: "Monday Classes",
      dataIndex: "day1",
      width: 110,
    },
    {
      title: "Tuesday Classes",
      dataIndex: "day2",
      width: 110,
    },
    {
      title: "Wednesday Classes",
      dataIndex: "day3",
      width: 110,
    },
    {
      title: "Thursday Class",
      dataIndex: "day4",
      width: 110,
    },
    {
      title: "Friday Class",
      dataIndex: "day5",
      width: 90,
    },
    {
      title: "Avg Weekly Class",
      dataIndex: "avgClasses",
      width: 120,
    },
    {
      title: "Update",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
      width: 110,
    },
    {
      title: "Delete",
      key: "action",
      render: (text, record) => (
        <Button danger type="primary" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
      width: 110,
    },
  ];

  return (
    <div className="TableContainer">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: 400,
        }}
        onChange={handleChange}
      />

      {editVisible && (
        <EditTeacher
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          editRecord={editRecord}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default TableComp;
