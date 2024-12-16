'use client'

import { login, setAuthFormPassword, setAuthFormUsername } from '@/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useCookies } from 'next-client-cookies'
import React from 'react'
import { useRouter } from 'next/navigation'

function Login() {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const cookies = useCookies()

  const { form } = useAppSelector(state=> state.auth)
  const { username, password} = form

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
    const {payload} = await dispatch(login({username, password}))
    const { token } = payload

    cookies.set('excelator-token', token)
    router.refresh()
  }

  return (
    <form className='border-2 border-black rounded p-4' onSubmit={handleSubmit}>
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

export default Login