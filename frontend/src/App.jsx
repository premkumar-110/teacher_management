import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header'
import Filter from './Filter/Filter'
import Dashboard from './Dashboard/Dashboard';
import { message } from 'antd';
import axios from 'axios';


function App() {
  const [data,setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/teachers/getTeachers');
      setData(response.data);
    } catch (error) {
      message.error('Error fetching data: ' + error.message);
    }
  };
  useEffect(()=>{
    fetchData();
  })

  return (
    
    <div className='Container'>
      <Header/>
      <div className='Container2'>
        <Filter/>
        <Dashboard data={data} setData={setData}/>
      </div>
    </div>
  )
}

export default App
