import React, { useState } from 'react';
import './AddTeacher.css';
import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, message, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';

const AddTeacher = ({ setAddTeacher }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(24);
  const [dob, setDob] = useState();
  const [classNo, setClassNo] = useState(1);
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

      const response = await axios.post('http://localhost:3000/teachers', {
        fullName: name,
        age: age,
        dateOfBirth: dob,
        numberOfClasses: classNo,
      });

      if (response.status === 201) {
        message.success('Teacher added successfully!!');
      } else {
        message.warning('Unable to add data...');
      }
    } catch (error) {
      message.error('Error adding teacher: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setDob(date);
      console.log(date)
    } else {
      console.log('Clear');
    }
  };
  

  return (
    <div className='AddTeacherContainer'>
      <div className='AddTeacher'>
        <div className='AddTeacherHeader'>
          <div className='fontBold'>ADD TEACHER</div>
          <CloseOutlined onClick={() => setAddTeacher(false)} className='CloseAddTeacher' />
        </div>
        <div className='AddingContainer'>
          <div className='InputContainer'>
            <Form.Item label='FULL NAME'>
              <Input value={name} onChange={(e) => handleNameChange(e.target.value)} />
            </Form.Item>
            <Form.Item label='DATE OF BIRTH'>
            <input
                type="date"
                onChange={(e) => onChange(e.target.value)}
                // Remove the value attribute to make it an uncontrolled input
                // value={dob}
            />
            </Form.Item>
          </div>
          <div className='InputContainer'>
            <Form.Item label='AGE'>
              <InputNumber min={20} value={age} onChange={(value) => handleAgeChange(value)} />
            </Form.Item>
            <Form.Item label='NUMBER OF CLASS'>
              <InputNumber min={1} value={classNo} onChange={(value) => setClassNo(value)} placeholder='1' />
            </Form.Item>
          </div>
        </div>
        <small>{errorMessage}</small>
        <Button
          type='primary'
          style={{ width: '50%', display: 'block', margin: 'auto' }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? <Spin style={{ color: 'white' }} /> : 'ADD NEW TEACHER'}
        </Button>
      </div>
    </div>
  );
};

export default AddTeacher;
