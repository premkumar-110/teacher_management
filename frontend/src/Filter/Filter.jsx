import React, { useState } from 'react';
import './Filter.css';
import { Slider, Button, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Filter = () => {
  // State for storing filter values
  const [ageRange, setAgeRange] = useState(24);
  const [classRange, setClassRange] = useState(1);
  const [ageFilters, setAgeFilters] = useState([]);
  const [classFilters, setClassFilters] = useState([]);
  const [disabled,setdisabled] = useState(false);

  const handleAgeChange = (value) => {
    setAgeRange(value);
  };

  const handleClassChange = (value) => {
    setClassRange(value);
  };

  // Event handler for checkboxes
  const handleCheckboxChange = (filterType, value) => {
    if (filterType === 'age') {
      if (ageFilters.includes(value)) {
        setAgeFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
      } else {
        setAgeFilters((prevFilters) => [...prevFilters, value]);
      }
    } else if (filterType === 'class') {
      if (classFilters.includes(value)) {
        setClassFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
      } else {
        setClassFilters((prevFilters) => [...prevFilters, value]);
      }
    }
  };
  
  

  // Event handler for search button
  const handleSearch = () => {
    // Perform filtering based on selected criteria (ageRange, classRange, ageFilters, classFilters)
    // Display the filtered results or update your component's state accordingly
    console.log('Filtered Data:', { ageRange, classRange, ageFilters, classFilters });
  };

  return (
    <div className='FilterContainer'>
      <div className='SearchTitle'>
        <p className='fontBold'>FILTER TEACHER</p> 
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
      <br />
      <div className='AgeFilter'>
        <p className='fontBold'>FILTER BY AGE</p><br/>
        <Slider  value={ageRange} min={24} max={60} included={false}  onChange={handleAgeChange} disabled={ageFilters.length > 0 || classFilters.length > 0} />
        <div className='FilterInput'>
          <div>
            <Checkbox onChange={() => handleCheckboxChange('age', '20-30')}>Age &gt;= 20 and Age &lt; 30</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('age', '30-40')}>Age &gt;= 30 and Age &lt; 40</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('age', '40-50')}>Age &gt;= 40 and Age &lt; 50</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('age', '50-60')}>Age &gt;= 50 and Age &lt;= 60</Checkbox>
          </div>
        </div>
      </div>
      <br />
      <div className='totalClassFilter'>
        <p className='fontBold'>FILTER BY NUMBER OF CLASS</p><br/>
        <Slider  value={classRange} included={false}  onChange={handleClassChange} disabled={ageFilters.length > 0 || classFilters.length > 0}/>
        <div className='FilterInput'>
          <div>
            <Checkbox onChange={() => handleCheckboxChange('class', '1-3')}>Class &gt;= 1 and Class &lt; 3</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('class', '3-5')}>Class &gt;= 3 and Class &lt; 5</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('class', '5-8')}>Class &gt;= 5 and Class &lt; 8</Checkbox>
            <Checkbox onChange={() => handleCheckboxChange('class', '8-10')}>Class &gt;= 8 and Class &lt;= 10</Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
