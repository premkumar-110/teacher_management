import React, { useState } from "react";
import "./AddTeacher.css";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Spin,
} from "antd";
import axios from "axios";

const AddTeacher = ({ setAddTeacher, onUpdate }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(24);
  const [dob, setDob] = useState();
  const [classNo, setClassNo] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
    if (value < 24 || value > 60) {
      message.warning("Age should be grater than 23");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      if (!name || !dob || !classNo || errorMessage) {
        message.warning("All fields are required!!!");
        return;
      }

      const response = await axios.post(
        "https://teacher-management-backend.vercel.app/api/teachers/addTeacher",
        {
          fullName: name,
          age: age,
          dateOfBirth: dob,
          numberOfClasses: classNo,
        }
      );

      if (response.status === 201) {
        message.success("Teacher added successfully!!");
        onUpdate();
      } else {
        message.warning("Unable to add data...");
      }
    } catch (error) {
      message.error("Error adding teacher: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onChange = (date) => {
    if (date) {
      setDob(date);
    } else {
      console.log("Clear");
    }
  };

  return (
    <div className="AddTeacherContainer">
      <div className="AddTeacher">
        <div className="AddTeacherHeader">
          <div className="fontBold">ADD TEACHER</div>
          <CloseOutlined
            onClick={() => setAddTeacher(false)}
            className="CloseAddTeacher"
          />
        </div>
        <div className="AddingContainer">
          <Form.Item label="FULL NAME">
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Form.Item label="DATE OF BIRTH">
              <input type="date" onChange={(e) => onChange(e.target.value)} />
            </Form.Item>
            <Form.Item label="AGE">
              <InputNumber
                min={20}
                value={age}
                onChange={(value) => handleAgeChange(value)}
              />
            </Form.Item>
          </div>
          <Form.Item label="NUMBER OF CLASS">
            <InputNumber
              min={1}
              value={classNo}
              onChange={(value) => setClassNo(value)}
              placeholder="1"
            />
          </Form.Item>
        </div>
        <Button
          type="primary"
          style={{ width: "100%", display: "block", margin: "auto" }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? <Spin style={{ color: "white" }} /> : "ADD NEW TEACHER"}
        </Button>
      </div>
    </div>
  );
};

export default AddTeacher;
