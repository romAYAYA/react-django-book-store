import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Box, Button, TextField } from '@mui/material'
import { Typography } from '@mui/material'
import CottageIcon from '@mui/icons-material/Cottage'

import { IUserData } from '../models/user.interface.ts'
import { useForm, SubmitHandler } from 'react-hook-form'

import { registerUser } from '../store/actions/UserActions.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import LoginModal from '../components/LoginModal.tsx'

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthorized = useAppSelector((state) => state.userReducer.isAuthorized)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserData>()
  const selectedAvatar = watch('avatar')

  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, [isAuthorized, history])

  const onSubmit: SubmitHandler<IUserData> = async (payload) =>
    dispatch(registerUser(payload))

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto',
            height: '100dvh',
            gap: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Register
              </Typography>

              <Link to="/">
                <CottageIcon sx={{ cursor: 'pointer' }} color="secondary" />
              </Link>
            </Box>
            <TextField
              variant="standard"
              label="Nickname"
              type="text"
              {...register('username', { required: true })}
              error={!!errors.username}
              helperText={errors.username && 'Nickname is required'}
            />
            <TextField
              type="email"
              variant="standard"
              label="Email"
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={errors.email && 'Email field is required'}
            />
            <TextField
              type="password"
              variant="standard"
              label="Password"
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password && 'Password field is required'}
            />
            <Button variant="contained" component="label">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                {...register('avatar', { required: true })}
              />
            </Button>
            {selectedAvatar && !errors.avatar && (
              <p style={{ color: 'green' }}>Image selected</p>
            )}
            {errors.avatar && (
              <p style={{ color: 'red' }}>Avatar is required</p>
            )}
            <Button type="submit">Register</Button>
            <LoginModal />
          </Box>
        </Box>
      </form>
    </>
  )
}

export default RegisterPage
