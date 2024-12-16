import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Country {
  id?: number
  name: string
  revenue: number
}

export interface ReferenceabsolueState {
  country: {
    data: Country[]
    form: {
      name: string
      revenue: string
      openModal: boolean
    }
    selectedCountry: number
    error: boolean
    loading: boolean,
    total: number
  }
}

const initialState: ReferenceabsolueState = {
  country: {
    data: [],
    form: {
      name:"",
      revenue: "",
      openModal: false,
    },
    selectedCountry: 0,
    error: false,
    loading: false,
    total: 0
  }
}

export const referenceabsolueSlice = createSlice({
  name: "referenceabsolue",
  initialState,
  reducers: {
    setCountryFormName(state, action) {
      state.country.form.name = action.payload
    },
    setCountryFormRevenue(state, action) {
      state.country.form.revenue = action.payload
    },
    resetCountryForm(state) {
      state.country.form = initialState.country.form
    },
    toggleOpenModal(state,action) {
      state.country.form.openModal = action.payload
    },
    setSelectedCountry(state,action) {
      state.country.selectedCountry = action.payload
    },
    setTotal(state,action) {
      state.country.total = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountry.fulfilled, (state, action) => {
        state.country.error = true
        state.country.data = action.payload
      })
      .addCase(fetchAllCountry.rejected, (state, action) => {
        state.country.loading = false
        state.country.error = true
      })
      .addCase(fetchAllCountry.pending, (state, action) => {
        state.country.loading = true
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.country.loading = false
        state.country.form.name = ''
        state.country.form.revenue = ''
        state.country.data.push(action.payload)
      })
      .addCase(addCountry.rejected, (state, action) => {
        state.country.loading = false
        state.country.error = true
      })
      .addCase(addCountry.pending, (state, action) => {
        state.country.loading = true
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.country.loading = false
        state.country.data = state.country.data.filter(country => country.id !== action.payload)

      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.country.loading = false
        state.country.error = true
      })
      .addCase(deleteCountry.pending, (state, action) => {
        state.country.loading = true
      })
  }
})

export const { toggleOpenModal, setCountryFormName, setCountryFormRevenue, setSelectedCountry, resetCountryForm, setTotal } = referenceabsolueSlice.actions

export const fetchAllCountry = createAsyncThunk(
  'referenceabsolue/fetchAllCountry',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referenceabsolue/countries/`)
      return (await response.json())
  }
)

export const addCountry = createAsyncThunk(
  'referenceabsolue/addCountry',
  async ({name, revenue}: {name: string, revenue: string}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referenceabsolue/countries/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          revenue
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const deleteCountry = createAsyncThunk(
  'referenceabsolue/deleteCountry',
  async ({id}: {id : number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referenceabsolue/countries/${id}/`, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      return id
  }
)

export default referenceabsolueSlice.reducer
