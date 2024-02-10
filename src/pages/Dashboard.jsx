import { useEffect, useState } from "react"
import axios from 'axios'
import {Navbar} from '../components/Navbar'
import { useNavigate } from "react-router-dom"
import '../components/compStyles.css'

const Dashboard = () => {
  const [Urls, setUrls] = useState([])
  const navigate = useNavigate()
  const setCookie = document.cookie

  useEffect( () => {
    const dummyFunction = async () => {
      if(document.cookie==='') {
        document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        navigate('/auth/login')
        return
      }
      const url = 'https://short-i6l5.onrender.com/user/dashboard'

      try {
        console.log(setCookie)
        const response = await axios.get(url, {headers: {
          'userId': setCookie.substring(5),
        }});

        if(response?.status !== 200) {
          window.alert('Error', response?.data?.message)
          console.log('No Url found for current user', response)
          return
        }

          // console.log(response)
          setUrls(response?.data?.myUrls)
        }
        catch(err) {
          window.alert(`User not found: ${err}`)
          return
        }
      }

      dummyFunction()
  }, [navigate, setCookie])
  return (
    <>
    <Navbar/>
    <h1 className="static-txt">My <span className="dynamic-txt">Urls'</span></h1>
    <div className="table-heading">My Links</div>

    <div className="table-wrapper">
    <table border='1px'>
      <tbody>
      <tr>
        <th>Links</th>
        <th>Clicks</th>
      </tr>
      {Urls.map((url) => (
        <tr key={url.shortId}>
          <td>{url?.redirectUrl}</td>
          <td>{url?.visitHistory?.length}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
    </>
  )
}

export default Dashboard