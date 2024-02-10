import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import '../components/compStyles.css'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setCookie = document.cookie
  const navigate = useNavigate()

  useEffect(() => {
    if(setCookie!=='')
    navigate('/')
  }, [setCookie, navigate])

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password || !name || email==='' || password==='' || name==='')
    {
      window.alert("Required all fields")
      return
    }
    
    const url = 'https://short-i6l5.onrender.com/auth/signUp'

    try {
      const response = await axios.post(url, {name, email, password});

      if(response?.status !== 200) {
        window.alert('Something went wrong/ check credentials / Registered Email')
        console.log('Email already registered', response)
        return
      }

      // console.log(response.data);
      // console.log(response.data?.newUser._id)

      const expireTime = Date.now() + 600000
      document.cookie = `uuid=${response.data.newUser._id}; expires=${expireTime};  path: ['/', '/auth/login', '/auth/signup', '/dashboard]`;

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
        <div className='signup-form'>
        <form>
            <h3>Create new Account!</h3>
            <input type="text" name="name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" name="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' onClick={handleSignUpSubmit}>Sign Up</button>
            
            <div>
                <span>Alreay has a account?</span>
                <a href="/auth/login">click here</a>
            </div>
        </form>    
        </div>
    </div>
    </>
  )
}

export default SignUp