import './compStyles.css'
import Logo from '../assests/pngegg.png'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    if(document.cookie==='')
    {
      navigate('/auth/login')
      return
    }
    document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    navigate('/auth/login')
  }
  return (
    <div className='navbar'>
        <div className='nav-items'>
            <div><a href="/" className='logo'><img src={Logo} alt='Logo'/></a></div>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/dashboard'>DashBoard</a></li>
                <li><button onClick={handleLogout}>{document.cookie==='' ? "SignIn" : "Logout"}</button></li>
            </ul>
        </div>
    </div>
  )
}
