import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Blogs from './components/Blogs'
import Auth from './components/Auth'
import UserBlogs from './components/UserBlogs'
import BlogDetail from './components/BlogDetail'
import AddBlog from './components/AddBlog'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store'


function App () {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isLoggedIn ? (
          <Route path='/' element={<Auth />} />
        ) : (
          <>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/myBlogs' element={<UserBlogs />} />
            <Route path='/myBlogs/:id' element={<BlogDetail />} />
            <Route path='/blogs/add' element={<AddBlog />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
