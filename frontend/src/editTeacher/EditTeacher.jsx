import React, { useState } from "react";
import "./editTeacher.css";
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

const EditTeacher = ({ editRecord, setEditVisible, editVisible, onUpdate }) => {
  const [firstName, setFirstName] = useState(editRecord.firstName);
  const [lastName, setLastName] = useState(editRecord.lastName);
  const [age, setAge] = useState(editRecord.age);
  const [dob, setDob] = useState(editRecord.dateOfBirth);
  const [day1,setDay1] = useState(editRecord.day1);
  const [day2,setDay2] = useState(editRecord.day2);
  const [day3,setDay3] = useState(editRecord.day3);
  const [day4,setDay4] = useState(editRecord.day4);
  const [day5,setDay5] = useState(editRecord.day5);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
    
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      if (!firstName || !lastName || !dob || !age ) {
        message.warning("All fields are required!!!");
        return;
      }

      const response = await axios.put(
        `https://teacher-management-backend.vercel.app/api/teachers/update/${editRecord._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          age: age,
          dateOfBirth: dob,
          day1:day1,
          day2:day2,
          day3:day3,
          day4:day4,
          day5:day5,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        message.success("Teacher updated successfully!!");
        onUpdate();
        setEditVisible(false);
      } else {
        message.warning("Unable to update teacher data...");
      }
    } catch (error) {
      message.error("Error updating teacher: " + error.message);
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
          <div className="fontBold">UPDATE TEACHER</div>
          <CloseOutlined
            onClick={() => setEditVisible(false)}
            className="CloseAddTeacher"
          />
        </div>
        <div className="AddingContainer">
          <div className="InputContainer">
            <Form.Item label="FIRST NAME">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="LAST NAME">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
            </div>
            <div className="Classes">
            <Form.Item label="DATE OF BIRTH">
              <input type="date" onChange={(e) => onChange(e.target.value)} value={dob}/>
            </Form.Item>
            <Form.Item label="AGE">
              <InputNumber
                value={age}
                onChange={(value) => handleAgeChange(value)}
              />
            </Form.Item>
            </div>
         <div className="Classes">
          <Form.Item label="CLASSES ON MONDAY">
            <InputNumber
              min={0}
              value={day1}
              onChange={(value) => setDay1(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="CLASSES ON TUESDAY">
            <InputNumber
              min={0}
              value={day2}
              onChange={(value) => setDay2(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="CLASSES ON WEDNESDAY">
            <InputNumber
              min={0}
              value={day3}
              onChange={(value) => setDay3(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="CLASSES ON THURSDAY">
            <InputNumber
              min={0}
              value={day4}
              onChange={(value) => setDay4(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="CLASSES ON FRIDAY">
            <InputNumber
              min={0}
              value={day5}
              onChange={(value) => setDay5(value)}
              placeholder="1"
            />
          </Form.Item>
          </div>  
        </div>
        <Button
          type="primary"
          style={{ width: "50%", display: "block", margin: "auto" }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? <Spin style={{ color: "white" }} /> : "UPDATE TEACHER"}
        </Button>
      </div>
    </div>
  );
};

export default EditTeacher;
