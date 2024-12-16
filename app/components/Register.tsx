'use client'

import { register, setAuthFormEmail, setAuthFormPassword, setAuthFormUsername } from '@/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'

function Register() {

  const dispatch = useAppDispatch()

  const { form } = useAppSelector(state=> state.auth)
  const { email, username, password} = form

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
  
    dispatch(setAuthFormEmail(value))
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
  
    dispatch(setAuthFormUsername(value))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
  
    dispatch(setAuthFormPassword(value))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(register({email, username, password}))

  }

  return (
    <form className='border-2 border-black rounded p-4' onSubmit={handleSubmit}>

      <div>
        <label htmlFor="email" className="inline-block font-medium mb-2 text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder='email'
          onChange={handleChangeEmail}
          required
          className="border p-2 mb-4 w-full text-black"
        />
      </div>
      <div>
        <label htmlFor="username" className="inline-block font-medium mb-2 text-white">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder='username'
          onChange={handleChangeUsername}
          required
          className="border p-2 mb-4 w-full text-black"
        />
      </div>

      <div>
        <label htmlFor="passaword" className="inline-block font-medium mb-2 text-white">
          Password
        </label>
        <input
          type="password"
          id="passaword"
          name="passaword"
          placeholder='*** ***** ***'
          value={password}
          onChange={handleChangePassword}
          required
          className="border p-2 mb-4 w-full text-black"
        />
      </div>

      <button
        className='border border-black px-4 py-2 rounded hover:bg-gradient-to-b hover:from-pink-200 hover:to-emerald-200 p-2 duration-200'
        type="submit"
      >
        ENVOYER
      </button>
    </form>
  )
}

export default Register