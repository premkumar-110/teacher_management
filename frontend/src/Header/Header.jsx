import React, { useState } from 'react';
import './Header.css';
import { Input, Space } from 'antd';
const Header = () => {
  const {Search} = Input;
  const [searchValue,setSearch] = useState('');
  const onSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className='Header'>
        <div className='Title'>TEACHER MANAGEMENT SYSTEM</div>
       <div className='RightContainer'>
        <div>
          {/* <Space direction="vertical" >
            <Search
              className='HeaderSearch'
              placeholder="Search..."
              allowClear
              onChange={(e)=>{onSearch(e)}}
              style={{
                width: 200,
              }}
              value={searchValue}
              size="large"
              onPressEnter={()=>{console("Called")}}
            />
          </Space> */}
        </div>
        <span class="material-symbols-outlined userLogo">
          school
        </span>
        </div>
      </div>
    </>
  );
};

export default Header;
