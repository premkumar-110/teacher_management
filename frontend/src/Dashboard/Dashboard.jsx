import React, { useState } from 'react'
import './Dashboard.css';
import { Input, Space,Button, Flex, Tooltip,message } from 'antd';
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import TableComp from '../Table/TableComp';
import AddTeacher from '../AddTeacher/AddTeacher';
import axios from 'axios';

const Dashboard = ({data,setData}) => {

  const {Search} = Input;
  const [searchValue,setSearch] = useState('');

  const onSearch = (e) => setSearch(e.target.value);
  const [addTeacher,setAddTeacher] = useState(false);
  const [editVisible,setEditVisible] = useState(false);

  const handleSearch =async ()=>{
    const response = await axios.post("http://localhost:3000/api/teachers/search",{
      searchValue
    })
  }
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
                onPressEnter={handleSearch}
              />
            </Space>
            <Tooltip title="Add new teacher">
            <Button className='AddTeacherButton' type="primary" icon={<PlusOutlined />} onClick={()=>{setAddTeacher(true)}}>ADD</Button>
            </Tooltip>
        </div>
        <TableComp data={data} setData={setData} setEditVisible={setEditVisible} editVisible={editVisible}/>
        {addTeacher && <AddTeacher setAddTeacher={setAddTeacher}/>}
      </div>
    </div>
  )
}

export default Dashboard