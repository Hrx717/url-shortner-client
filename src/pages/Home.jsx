import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import UrlForm from '../components/UrlForm'
import {useNavigate} from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const output = document.cookie

  useEffect(() => {
    if(output==='')
    navigate('/auth/login')
  }, [navigate, output])

  return (
    <div>
        <Navbar/>
        <UrlForm/>
    </div>
  )
}

export default Home