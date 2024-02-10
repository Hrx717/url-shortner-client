import { useState } from 'react'
import axios from 'axios'
import './compStyles.css'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const [longUrl , setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const navigate = useNavigate()

  const serverUrl = 'https://short-i6l5.onrender.com'

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    if(longUrl==='') {
      window.alert("Please provide authentic url..")
      return
    }
    const setCookie = document.cookie
    if(setCookie==='') {
      window.alert("Session expired. Login Again")
      document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      navigate('/auth/login')
      return
    }
    const userId = setCookie.substring(5)
    // console.log(userId)
    const url = 'https://short-i6l5.onrender.com/url'
    const response = await axios.post(url, {longUrl, userId})
    // console.log(response.data.urlId)
    setShortUrl(response.data.urlId)
  }
  return (
    <div className='wrapper'>
        <div className='title'>
            <div className='static-txt'>URL <span className='dynamic-txt'>Shortner</span></div>
        </div>

        <div className='input-form'>
            <form action="/url" method='post'>
                <h3>Create Short Url of your website!</h3>
                <input type="text" name="url" id="url-input" placeholder='Paste Url...' value={longUrl} onChange={(e) => setLongUrl(e.target.value)}/>
                <button type='submit' onClick={handleUrlSubmit}>Create</button>

                {shortUrl && <div className='shortlinks'>
                <h4>{`${serverUrl}/${shortUrl}`}</h4>
                <a href={`${serverUrl}/${shortUrl}`} target='_blank' rel="noopener noreferrer">redirect</a>
            </div>}
            </form>
        </div>
    </div>
  )
}

export default Main