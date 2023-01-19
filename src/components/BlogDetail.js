import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material'

const labelStyle = {
  mb: 1,
  mt: 1,
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#13005A'
}

const BlogDetail = () => {
  const navigate =useNavigate()
  const id = useParams().id
  const [blog, setBlog] = useState()
  const [inputs, setInputs] = useState({})
  const handleChange = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const fetchDetails = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data)
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      })
    })
  }, [id])
  console.log(blog)

  const sendRequest = async () => {
    const res = await axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      
      })
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendRequest()
    .then(()=>navigate('/myBlogs'))
  }
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            backgroundColor='#F1F1F1'
            borderRadius={10}
            boxShadow='10px 10px 20px #ccc'
            padding={5}
            margin='auto'
            marginTop={3}
            display='flex'
            flexDirection='column'
            width='70%'
          >
            <Typography
              fontWeight={'bold'}
              color='#1C82AD'
              variant='h3'
              textAlign={'center'}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              name='title'
              onChange={handleChange}
              value={inputs.title}
              margin='normal'
              variant='outlined'
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name='description'
              onChange={handleChange}
              value={inputs.description}
              margin='normal'
              variant='outlined'
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant='contained'
              color='warning'
              type='submit'
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default BlogDetail
