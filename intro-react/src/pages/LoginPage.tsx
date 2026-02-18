import { useState } from 'react'
import { isEmail } from '../utils/isEmail'
import ContinuousSlider from '../utils/ContinuousSlider'
import { authActions, authReducer } from '../store/authSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useNavigate } from 'react-router'




function LoginPage() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    if (!isEmail(email)) {
      alert('Please enter a valid email address.')
      return
    }

    const response = await fetch('http://localhost:5173/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.status !== 200) {
      alert('Login failed. Please check your credentials.')
      return
    }

    const meResponse = await fetch('http://localhost:5173/api/auth/me')
    const data = await meResponse.json()
    console.log('User info from API:', data)
    dispatch(authActions.setUserInfo(data.user))
    navigate('/')
  }

  const logout = () => {
    dispatch(authActions.setUserInfo(undefined))
    setEmail('')
    setPassword('')
  }

  return (
    <div className="App">
      <h1>Login Page</h1>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default LoginPage
          
          