import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate()
  const handleEdit = e => {
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/Blogs'))
  }
  return (
    <div>
      <Card
        sx={{
          width: '60%',
          margin: 'auto',
          mt: 3,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': { boxShadow: '10px 10px 20px #ccc' }
        }}
      >
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto',color:"#1C82AD" }}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{color:"#FF0032" }}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader sx={{color:"#34568B",textShadow: "1px 1px 2px rgba(0,0,0,0.6)"}}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component='img'
          height='194'
          image={imageURL}
          alt='Paella dish'
        />
        <CardContent>
          <hr/><br/>
          <Typography variant='body2' color='#282A3A'>
            <b>{userName}</b>
            {' : '}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog
