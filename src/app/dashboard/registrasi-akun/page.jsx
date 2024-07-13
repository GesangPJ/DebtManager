"use client"

import { useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'

const RegistrasiAkun = () => {
  const {data: session, status} = useSession()
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Jangan lakukan apa pun saat sesi sedang dimuat

    if (!session) {
      router.push('/error/401')
    }

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [session, status, router, alert])

  if (!session) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      userType: data.get('userType')
    }

    try {
      const response = await fetch('/api/registrasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Account Registered Successfully!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Error while registering account.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Error while registering account.')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Account Registration' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='nama'
                  name='name'
                  fullWidth
                  label='Name'
                  placeholder='Account Name'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='email'
                  name='email'
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Account Email'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  name='password'
                  fullWidth
                  type='password'
                  label='Password'
                  placeholder='Password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-key-2-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='usertype'>Account Type</InputLabel>
                  <Select
                    native
                    label='Tipe Akun'
                    defaultValue=''
                    inputProps={{
                      name: 'userType',
                      id: 'usertype'
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'KARYAWAN'}>User</option>
                    <option value={'ADMIN'}>Admin</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegistrasiAkun
