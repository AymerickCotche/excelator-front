import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface Facture {
  id?: number
  num_facture: string
  grossiste: boolean
  paiement_comptant: boolean
  vente_emportee: boolean
  marchandise_ht: number
  remise_1: number
  remise_2: number
  sous_total_1: number
  sous_total_2: number
  escompte: number
  total_ht: number
  tva: number
  total_ttc: number
  frais_de_port: number
  total_a_payer: number
}

export interface FacturationState {
  data: Facture[]
  form: {
    grossiste: boolean
    paiement_comptant : boolean
    vente_emportee: boolean
    marchandise_ht: string
    openModal: boolean
  }
  selectedInvoice: Facture | null
  error: boolean
  loading: boolean,
}

const initialState: FacturationState = {
  data: [],
  form: {
    grossiste: false,
    paiement_comptant : false,
    vente_emportee: false,
    marchandise_ht: '',
    openModal: false
  },
  selectedInvoice: null,
  error: false,
  loading: false,
}

export const facturationSlice = createSlice({
  name: "facturation",
  initialState,
  reducers: {
    setFactureFormMarchandiseHT(state, action) {
      state.form.marchandise_ht = action.payload
    },
    setFactureFormGrossiste(state, action) {
      state.form.grossiste = action.payload
    },
    setFactureFormPaiementComptant(state, action) {
      state.form.paiement_comptant = action.payload
    },
    setFactureFormVenteEmportee(state, action) {
      state.form.vente_emportee = action.payload
    },
    resetFactureForm(state) {
      state.form = initialState.form
    },
    setSelectedInvoice(state, action) {
      state.selectedInvoice = action.payload
    },
    toggleOpenModal(state,action) {
      state.form.openModal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFacture.fulfilled, (state, action) => {
        state.error = true
        state.data = action.payload
      })
      .addCase(fetchAllFacture.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchAllFacture.pending, (state, action) => {
        state.loading = true
      })
      .addCase(addFacture.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(addFacture.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(addFacture.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteFacture.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter(facture => facture.id !== action.payload)

      })
      .addCase(deleteFacture.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(deleteFacture.pending, (state, action) => {
        state.loading = true
      })
  }
})

export const { toggleOpenModal, resetFactureForm, setSelectedInvoice, setFactureFormMarchandiseHT, setFactureFormGrossiste, setFactureFormPaiementComptant, setFactureFormVenteEmportee } = facturationSlice.actions

export const fetchAllFacture = createAsyncThunk(
  'facturation/fetchAllFacture',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facturation/invoices/`)
      return (await response.json())
  }
)

export const addFacture = createAsyncThunk(
  'facturation/addFacture',
  async ({grossiste, paiement_comptant, vente_emportee, marchandise_ht}: {grossiste: boolean, paiement_comptant: boolean, vente_emportee: boolean, marchandise_ht: string}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facturation/invoices/`, {
        method: 'POST',
        body: JSON.stringify({
          grossiste,
          paiement_comptant,
          vente_emportee,
          marchandise_ht
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const deleteFacture = createAsyncThunk(
  'facturation/deleteFacture',
  async ({id}: {id : number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facturation/invoices/${id}/`, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      return id
  }
)

export default facturationSlice.reducer
