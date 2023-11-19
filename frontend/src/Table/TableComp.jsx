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
      title: "Name",
      dataIndex: "fullName",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      width: 150,
    },
    {
      title: "Number of Classes",
      dataIndex: "numberOfClasses",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button danger type="primary" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
      width: 150,
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

      <Modal
        title="Edit User"
        visible={visible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Full Name" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Number of Classes" name="numberOfClasses">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
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
