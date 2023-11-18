import React, { useState } from 'react'
import './Dashboard.css';
import { Input, Space,Button, Flex, Tooltip } from 'antd';
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import TableComp from '../Table/TableComp';
import AddTeacher from '../AddTeacher/AddTeacher';

const Dashboard = () => {

  const {Search} = Input;
  const [searchValue,setSearch] = useState('');

  const onSearch = (e) => setSearch(e.target.value);
  const [addTeacher,setAddTeacher] = useState(false);

  return (
    <div className='DashboardContainer'>
      <div className="">
        <span className='fontBold'>DASHBOARD</span><br/><br/>
        <div className='SearchContainer'>
          <Space direction="vertical" style={{width:"100%"}}>
              <Search
                placeholder="Search..."
                className='HeaderSearch'
                allowClear
                onChange={(e)=>{onSearch(e)}}
                value={searchValue}
                size="large"
                onPressEnter={()=>{console("Called")}}
              />
            </Space>
            <Tooltip title="Add new teacher">
            <Button className='AddTeacherButton' type="primary" icon={<PlusOutlined />} onClick={()=>{setAddTeacher(true)}}>ADD</Button>
            </Tooltip>
        </div>
        <TableComp/>
        {addTeacher && <AddTeacher setAddTeacher={setAddTeacher}/>}
      </div>
    </div>
  )
}

export default Dashboard