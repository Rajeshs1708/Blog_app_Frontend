import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import Grid from '@mui/material/Grid'


const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [value, setValue] = useState(0)
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <AppBar
          position='sticky'
          sx={{
            background:
              'linear-gradient(90deg, rgba(28,25,78,1) 0%, rgba(37,136,156,1) 31%, rgba(72,16,96,1) 88%)'
          }}
        >
          <Toolbar>
            <Typography variant='h4'>BlogsApp</Typography>
            {isLoggedIn && (
              <Box display='flex' margin='auto'>
                <Tabs
                  textColor='inherit'
                  value={value}
                  onChange={(e, val) => {
                    setValue(val)
                  }}
                >
                  <Tab LinkComponent={Link} to='/blogs' label='All Blogs' />
                  <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs' />
                  <Tab LinkComponent={Link} to='/blogs/add' label='Add Blogs' />
                </Tabs>
              </Box>
            )}
            <Box display='flex' marginLeft='auto'>
              {!isLoggedIn && (
                <>
                  <Button
                    LinkComponent={Link}
                    to='/'
                    sx={{ margin: 2, borderRadius: 10 }}
                    variant='contained'
                    color='warning'
                  >
                    Login
                  </Button>
                  <Button
                    LinkComponent={Link}
                    to='/'
                    sx={{ margin: 2, borderRadius: 10 }}
                    variant='contained'
                    color='warning'
                  >
                    Signup
                  </Button>
                </>
              )}
              {isLoggedIn && (
                <Button
                  onClick={() => dispatch(authActions.logout())}
                  LinkComponent={Link}
                  to='/'
                  variant='contained'
                  sx={{ margin: 2, borderRadius: 10 }}
                  color='error'
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  )
}

export default Header
