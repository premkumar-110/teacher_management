import React, { useState } from 'react';
import './editTeacher.css';
import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, message, Spin } from 'antd';
import axios from 'axios';

const EditTeacher = ({ editRecord , setEditVisible, editVisible }) => {
  const [name, setName] = useState(editRecord.fullName);
  const [age, setAge] = useState(editRecord.age);
  const [dob, setDob] = useState(editRecord.dateOfBirth);
  const [classNo, setClassNo] = useState(editRecord.numberOfClasses);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
    if (value < 24 || value > 60) {
      setErrorMessage('Age should be between 24 and 60');
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
  
    try {
      if (!name || !dob || !classNo || errorMessage) {
        message.warning('All fields are required!!!');
        return;
      }
  
      const response = await axios.put(`http://localhost:3000/api/teachers/update/${editRecord._id}`, {
        fullName: name,
        age: age,
        dateOfBirth: dob,
        numberOfClasses: classNo,
      });
  
      if (response.status >= 200 && response.status < 300) {
        message.success('Teacher updated successfully!!');
      } else {
        message.warning('Unable to update teacher data...');
      }
    } catch (error) {
      message.error('Error updating teacher: ' + error.message);
    } finally {
      setUploading(false);
    };
  };
  

  const onChange = (date) => {
    if (date) {
      setDob(date);
    } else {
      console.log('Clear');
    }
  };
  

  return (
    <div className='AddTeacherContainer'>
      <div className='AddTeacher'>
        <div className='AddTeacherHeader'>
          <div className='fontBold'>UPDATE TEACHER</div>
          <CloseOutlined onClick={() => setEditVisible(false)} className='CloseAddTeacher' />
        </div>
        <div className='AddingContainer'>
          <div className='InputContainer'>
            <Form.Item label='FULL NAME'>
              <Input value={name} onChange={(e) => handleNameChange(e.target.value)} />
            </Form.Item>
            <Form.Item label='DATE OF BIRTH'>
              
            <input
            value={dob}
                type="date"
                onChange={(e) => onChange(e.target.value)}
            />
            </Form.Item>
          </div>
          <div className='InputContainer'>
            <Form.Item label='AGE'>
              <InputNumber min={24} value={age} onChange={(value) => handleAgeChange(value)} />
            </Form.Item>
            <Form.Item label='NUMBER OF CLASS'>
              <InputNumber min={1} value={classNo} onChange={(value) => setClassNo(value)} placeholder='1' />
            </Form.Item>
          </div>
        </div>
        <Button
          type='primary'
          style={{ width: '50%', display: 'block', margin: 'auto' }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? <Spin style={{ color: 'white' }} /> : 'UPDATE TEACHER'}
        </Button>
      </div>
    </div>
  );
};

export default EditTeacher