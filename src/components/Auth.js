import React, { useState } from 'react'
import { Typography, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: '',
    email: 'rajesh@gmail.com',
    password: 'rajesh123'
  })
  const [isSignup, setIsSignup] = useState(false)

  const handleChange = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequest = async (type = 'login') => {
    const res = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      })
      .catch(err => console.log(err))

    const data = await res.data
    return data
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (isSignup) {
      sendRequest('signup')
        .then(data => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
    } else {
      sendRequest()
        .then(data => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          boxShadow='10px 10px 20px #ccc'
          padding={2}
          margin='auto'
          marginTop={2}
          borderRadius={5}
        >
          <Typography variant='h3' padding={2} textAlign='center'>
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField
              name='name'
              onChange={handleChange}
              value={inputs.name}
              placeholder='Name'
              margin='normal'
            />
          )}
          <TextField
            name='email'
            onChange={handleChange}
            value={inputs.email}
            type={'email'}
            placeholder='Email'
            margin='normal'
          />
          <TextField
            name='password'
            onChange={handleChange}
            value={inputs.password}
            type={'password'}
            placeholder='Password'
            margin='normal'
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ borderRadius: 3, marginTop: 2 }}
            color='warning'
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 2 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            Change to {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth
