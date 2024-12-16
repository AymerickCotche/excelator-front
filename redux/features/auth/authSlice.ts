import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface User {
  id?: number
  username: string
  password: string
}

export interface AuthState {
  data: User[]
  form: {
    email: string
    username: string
    password : string
    openModal: boolean
  },
  isRegister: boolean,
  error: boolean
  loading: boolean,
  message: string
}

const initialState: AuthState = {
  data: [],
  form: {
    email: "",
    username: "",
    password: "",
    openModal: false
  },
  isRegister: false,
  error: false,
  loading: false,
  message : ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFormUsername(state, action) {
      state.form.username = action.payload
    },
    setAuthFormEmail(state, action) {
      state.form.email = action.payload
    },
    setAuthFormPassword(state, action) {
      state.form.password = action.payload
    },
    setIsRegister(state, action) {
      state.isRegister = action.payload
    },
    resetAuthForm(state) {
      state.form = initialState.form
    },
    toggleOpenModal(state,action) {
      state.form.openModal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.username) {
          state.message = "Compte créé avec succés, veuillez vous connecter"
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true
      })
  }
})

export const { toggleOpenModal, setIsRegister, resetAuthForm, setAuthFormEmail, setAuthFormPassword, setAuthFormUsername } = authSlice.actions

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}: {username: string, password: string}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customauth/login/`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({email, username, password}: {email : string, username: string, password: string}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customauth/create/`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export default authSlice.reducer
