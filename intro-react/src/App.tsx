import { useState } from 'react'
import { isEmail } from './utils/isEmail'
import PostList from './PostList'
import ContinuousSlider from './utils/ContinuousSlider'
import { LearningHooks } from './LearningHooks'


function App() {
  //return <LearningHooks />
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="App">
      <h1>Login Page</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome!</h2>
          <PostList />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <ContinuousSlider />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  )
    
}

export default App
