import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

const UserBlogs = () => {
  const id = localStorage.getItem('userId')
  const [user, setUser] = useState()

  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/blog/user/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  useEffect(() => {
    sendRequest().then(data => setUser(data.user))
  }, [])
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs
