import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import '../components/compStyles.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setCookie = document.cookie
  const navigate = useNavigate()

  useEffect(() => {
    if(setCookie!=='')
    navigate('/')
  }, [setCookie, navigate])


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password || email==='' || password==='')
    {
      window.alert("Required all fields")
      return
    }
    
    const url = 'https://short-i6l5.onrender.com/auth/login'
    try {
      const response = await axios.post(url, {email, password});
      if(response?.status !== 200) {
        window.alert('User not found')
        console.log('User not found', response)
        return
      }

      // console.log(response.data);
      // console.log(response.data.user._id)
      const expireTime = Date.now() + 600000
      const temp = new Date(expireTime)
      
      document.cookie = `uuid=${response.data.user._id}; expires=${temp.toUTCString()}; path: ['/', '/auth/login', '/auth/signup', '/dashboard]`;

      navigate('/')
    }
    catch(err) {
      window.alert(`User not found: ${err}`)
      return
    }
  }

  return (
    <>
    <Navbar/>
    <div className='wrapper'>
        <div className='title'>
            <div className='static-txt'>URL <span className='dynamic-txt'>Shortner</span></div>
        </div>
        <div className='login-form'>
        <form>
            <h3>Login!</h3>
            <input type="text" name="email" id="url-input" placeholder='Enter Email' 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder='Enter Password' 
            value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' onClick={handleLoginSubmit}>Login</button>
            <div>
                <span>New User?</span>
                <a href="/auth/signup">Click here</a>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Login