import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header'
import Filter from './Filter/Filter'
import Dashboard from './Dashboard/Dashboard'

function App() {

  return (
    <div className='Container'>
      <Header/>
      <div className='Container2'>
        <Filter/>
        <Dashboard/>
      </div>
    </div>
  )
}

export default App
