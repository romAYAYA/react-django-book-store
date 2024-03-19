import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Modal, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUserData } from '../models/user.interface.ts'
import { loginUser } from '../store/actions/UserActions.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'

const modalWindow = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  borderRadius: 5,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const LoginModal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector((state) => state.userReducer.isAuthorized)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>()
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, [isAuthorized, navigate])

  const onSubmit: SubmitHandler<IUserData> = async (payload) =>
    dispatch(loginUser(payload))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button color="secondary" onClick={handleOpen}>
        Have an account?
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalWindow}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Login
              </Typography>

              <TextField
                variant="standard"
                label="Nickname"
                type="text"
                {...register('username', { required: true })}
                error={!!errors.username}
                helperText={errors.username && 'Nickname is required'}
              />
              <TextField
                type="password"
                variant="standard"
                label="Password"
                {...register('password', { required: true })}
                error={!!errors.password}
                helperText={errors.password && 'Password field is required'}
              />
              <Button type="submit">Register</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default LoginModal
