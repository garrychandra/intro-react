import { useState } from 'react'
import { isEmail } from '../utils/isEmail'
import { authActions } from '../store/authSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useNavigate } from 'react-router'
import { Container, Box, TextField, Button } from '@mui/material'
import { Title } from "../components/Title";




export default function LoginPage() {

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

  return (
    <Container>
      <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, textAlign: 'center' }}>
        <Title>Login Page</Title>
        <br />
        <TextField id="outlined-basic" label="Email" variant="outlined" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br />
        <TextField id="outlined-basic" label="Password" variant="outlined" placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <Button onClick={login}>Login</Button> 
      </Box>
    </Container>
    // <div className="App">
    //   <h1>Login Page</h1>
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
      
        
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button onClick={login}>Login</button>
    //   </div>
    // </div>
  )
}
          
          