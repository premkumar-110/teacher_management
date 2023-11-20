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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(24);
  const [dob, setDob] = useState();
  const [classNo, setClassNo] = useState(1);
  const [day1,setDay1] = useState(0);
  const [day2,setDay2] = useState(0);
  const [day3,setDay3] = useState(0);
  const [day4,setDay4] = useState(0);
  const [day5,setDay5] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async () => {
    setUploading(true);

    try {
      if (!firstName ||!lastName || !dob || !classNo) {
        message.warning("All fields are required!!!");
        return;
      }

      const response = await axios.post(
        "https://teacher-management-backend.vercel.app/api/teachers/addTeacher",
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
        <div className="AddingContainer" style={{display:"flex",flexDirection:"column"}}>
      
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
          <div className="Classes">
            <Form.Item label="DATE OF BIRTH">
              <input type="date" onChange={(e) => onChange(e.target.value)} />
            </Form.Item>
            <Form.Item label="AGE">
              <InputNumber
                value={age}
                onChange={(value) => setAge(value)}
              />
            </Form.Item>
            </div>
         <div className="Classes">
          <Form.Item label="MONDAY CLASSES">
            <InputNumber
              min={0}
              value={day1}
              onChange={(value) => setDay1(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="TUESDAY CLASSES">
            <InputNumber
              min={0}
              value={day2}
              onChange={(value) => setDay2(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="WEDNESDAY CLASSES">
            <InputNumber
              min={0}
              value={day3}
              onChange={(value) => setDay3(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="THURSDAY CLASSES">
            <InputNumber
              min={0}
              value={day4}
              onChange={(value) => setDay4(value)}
              placeholder="1"
            />
          </Form.Item>
          <Form.Item label="FRIDAY CLASSES">
            <InputNumber
              min={0}
              value={day5}
              onChange={(value) => setDay5(value)}
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
        </Button></div>  
      </div>
    </div>
  );
};

export default AddTeacher;
