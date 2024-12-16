import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface Eleve {
  id?: number
  name: string
  age: number
  sexe: string
  note: number
  value_paid: number
  has_paid: boolean
  paid_month: string
}

export interface EleveForm {
  id?: number
  name: string
  age: string
  sexe: string
  note: string
  value_paid: string
  has_paid: boolean
  paid_month: string
}

export interface ElevesState {
  eleves: {
    data: Eleve[]
    form: {
      name: string
      age: string
      sexe: string
      note: string
      value_paid: string
      paid_month: string
      has_paid: boolean
      openModal: boolean
      openModalEdit: boolean
    }
    selectedEleve: Eleve
    error: boolean
    loading: boolean,
    total: number
  }
}

const initialState: ElevesState = {
  eleves: {
    data: [],
    form: {
      name:"",
      age: "",
      sexe: "Femme",
      note: "",
      value_paid: "",
      has_paid: false,
      openModal: false,
      openModalEdit: false,
      paid_month: 'Janvier'
    },
    selectedEleve: {
      name:"",
      age: 0,
      sexe: "Femme",
      note: 0,
      value_paid: 0,
      has_paid: false,
      paid_month: 'Janvier'
    },
    error: false,
    loading: false,
    total: 0
  }
}

export const elevesSlice = createSlice({
  name: "eleves",
  initialState,
  reducers: {
    setEleveFormName(state, action) {
      state.eleves.form.name = action.payload
    },
    setEleveFormAge(state, action) {
      state.eleves.form.age = action.payload
    },
    setEleveFormSexe(state, action) {
      state.eleves.form.sexe = action.payload
    },
    setEleveFormNote(state, action) {
      state.eleves.form.note = action.payload
    },
    setEleveFormPaidValue(state, action) {
      state.eleves.form.value_paid = action.payload
    },
    setEleveFormHasPaid(state, action) {
      state.eleves.form.has_paid = action.payload
    },
    setEleveFormPaidMonth(state, action) {
      state.eleves.form.paid_month = action.payload
    },
    resetEleveForm(state) {
      state.eleves.form = initialState.eleves.form
    },
    toggleOpenModal(state,action) {
      state.eleves.form.openModal = action.payload
    },
    toggleOpenModalEdit(state,action) {
      state.eleves.form.openModalEdit = action.payload
    },
    setSelectedEleve(state,action) {
      state.eleves.selectedEleve = action.payload
    },
    setEleveFormNameEdit(state, action) {
      state.eleves.selectedEleve.name = action.payload
    },
    setEleveFormAgeEdit(state, action) {
      state.eleves.selectedEleve.age = action.payload
    },
    setEleveFormSexeEdit(state, action) {
      state.eleves.selectedEleve.sexe = action.payload
    },
    setEleveFormNoteEdit(state, action) {
      state.eleves.selectedEleve.note = action.payload
    },
    setEleveFormPaidValueEdit(state, action) {
      state.eleves.selectedEleve.value_paid = action.payload
    },
    setEleveFormHasPaidEdit(state, action) {
      state.eleves.selectedEleve.has_paid = action.payload
    },
    setEleveFormPaidMonthEdit(state, action) {
      state.eleves.selectedEleve.paid_month = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEleve.fulfilled, (state, action) => {
        state.eleves.error = true
        state.eleves.data = action.payload
      })
      .addCase(fetchAllEleve.rejected, (state, action) => {
        state.eleves.loading = false
        state.eleves.error = true
      })
      .addCase(fetchAllEleve.pending, (state, action) => {
        state.eleves.loading = true
      })
      .addCase(addEleve.fulfilled, (state, action) => {
        state.eleves.loading = false
        state.eleves.form.name = ''
        state.eleves.form.age = ''
        state.eleves.data.push(action.payload)
      })
      .addCase(addEleve.rejected, (state, action) => {
        state.eleves.loading = false
        state.eleves.error = true
      })
      .addCase(addEleve.pending, (state, action) => {
        state.eleves.loading = true
      })
      .addCase(editEleve.fulfilled, (state, action) => {
        state.eleves.loading = false
        state.eleves.data = state.eleves.data.map(eleve =>
          eleve.id === action.payload.id ? { ...action.payload } : eleve
        )
      })
      .addCase(editEleve.rejected, (state, action) => {
        state.eleves.loading = false
        state.eleves.error = true
      })
      .addCase(editEleve.pending, (state, action) => {
        state.eleves.loading = true
      })
      .addCase(deleteEleve.fulfilled, (state, action) => {
        state.eleves.loading = false
        state.eleves.data = state.eleves.data.filter(eleve => eleve.id !== action.payload)

      })
      .addCase(deleteEleve.rejected, (state, action) => {
        state.eleves.loading = false
        state.eleves.error = true
      })
      .addCase(deleteEleve.pending, (state, action) => {
        state.eleves.loading = true
      })
      
  }
})

export const { toggleOpenModal,toggleOpenModalEdit, setEleveFormPaidMonth, setEleveFormName, setEleveFormAge, setEleveFormPaidValue, setEleveFormHasPaid, setSelectedEleve, setEleveFormNote, setEleveFormSexe, resetEleveForm,
  setEleveFormNameEdit, setEleveFormAgeEdit, setEleveFormPaidValueEdit, setEleveFormHasPaidEdit, setEleveFormNoteEdit, setEleveFormSexeEdit, setEleveFormPaidMonthEdit
 } = elevesSlice.actions

export const fetchAllEleve = createAsyncThunk(
  'eleves/fetchAllEleve',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eleves/eleves/`)
      return (await response.json())
  }
)

export const addEleve= createAsyncThunk(
  'eleves/addEleve',
  async ({name, age, sexe, note, value_paid, paid_month, has_paid}: {name: string, age: number, sexe: string, note: number, value_paid: number, paid_month: string, has_paid: boolean}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eleves/eleves/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          age,
          sexe,
          note,
          value_paid,
          paid_month,
          has_paid,

        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const editEleve = createAsyncThunk(
  'eleves/editEleve',
  async ({editedEleve}: {editedEleve : Eleve}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eleves/eleves/${editedEleve.id}/`, {
        method:'PUT',
        body: JSON.stringify(editedEleve),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const deleteEleve = createAsyncThunk(
  'eleves/deleteEleve',
  async ({id}: {id : number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eleves/eleves/${id}/`, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      return id
  }
)

export default elevesSlice.reducer
