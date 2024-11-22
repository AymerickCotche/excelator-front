import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Product {
  id?: number
  unit_price: number
  name: string
  total_sales: number
  total_purchases: number
  created: string
}

interface Purchase {
  id?: number
  quantity: number
  product: number
}

interface Sale {
  id?: number
  quantity: number
  product: number
}

export interface LesbasesState {
  product: {
    data: Product[]
    form: {
      name: string
      unit_price: string
      quantity: string
      openModal: boolean
      openModalProduct: boolean
      actionType: string
    }
    selectedProduct: number
    error: boolean
    loading: boolean
  }
}

const initialState: LesbasesState = {
  product: {
    data: [],
    form: {
      name:"",
      unit_price: "",
      quantity: "",
      openModal: false,
      openModalProduct: false,
      actionType: ""
    },
    selectedProduct: 0,
    error: false,
    loading: false
  }
}

export const lesbasesSlice = createSlice({
  name: "lesbases",
  initialState,
  reducers: {
    setProductForm: <K extends keyof LesbasesState["product"]["form"]>(
      state: LesbasesState,
      action: PayloadAction<{ field: K; value: LesbasesState["product"]["form"][K] }>
    ) => {
      const { field, value } = action.payload;
      state.product.form[field] = value;
    },
    resetProductForm(state) {
      state.product.form = initialState.product.form
    },
    setQuantityInput(state,action) {
      state.product.form.quantity = action.payload
    },
    toggleOpenModal(state,action) {
      state.product.form.openModal = action.payload
    },
    toggleOpenModalProduct(state,action) {
      state.product.form.openModalProduct = action.payload
    },
    setActionType(state,action) {
      state.product.form.actionType = action.payload
    },
    setSelectedProduct(state,action) {
      state.product.selectedProduct = action.payload
    },
    setProductNameForm(state,action) {
      state.product.form.name = action.payload
    },
    setProductPriceForm(state,action) {
      state.product.form.unit_price = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.product.error = true
        state.product.data = action.payload
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.product.loading = false
        state.product.error = true
      })
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.product.loading = true
      })
      .addCase(addPurchase.fulfilled, (state, action) => {
        state.product.error = true
        const foundProduct = state.product.data.find(product => product.id === state.product.selectedProduct)
        if (foundProduct) foundProduct.total_purchases += Number(state.product.form.quantity)
      })
      .addCase(addPurchase.rejected, (state, action) => {
        state.product.loading = false
        state.product.error = true
      })
      .addCase(addPurchase.pending, (state, action) => {
        state.product.loading = true
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.product.error = true
        const foundProduct = state.product.data.find(product => product.id === state.product.selectedProduct)
        if (foundProduct) foundProduct.total_sales += Number(state.product.form.quantity)
      })
      .addCase(addSale.rejected, (state, action) => {
        state.product.loading = false
        state.product.error = true
      })
      .addCase(addSale.pending, (state, action) => {
        state.product.loading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.error = true
        state.product.data.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.product.loading = false
        state.product.error = true
      })
      .addCase(addProduct.pending, (state, action) => {
        state.product.loading = true
      })
      
  }
})

export const { setQuantityInput, toggleOpenModal, setActionType, setSelectedProduct, toggleOpenModalProduct, setProductNameForm, setProductPriceForm } = lesbasesSlice.actions

export const fetchAllProduct = createAsyncThunk(
  'lesbases/fetchAllProduct',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesbases/products/`)
      return (await response.json())
  }
)

export const addPurchase = createAsyncThunk(
  'lesbases/addPurchase',
  async ({product, quantity}: {product: number, quantity: number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesbases/purchases/`, {
        method: 'POST',
        body: JSON.stringify({
          product,
          quantity
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const addSale = createAsyncThunk(
  'lesbases/addSale',
  async ({product, quantity}: {product: number, quantity: number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesbases/sales/`, {
        method: 'POST',
        body: JSON.stringify({
          product,
          quantity
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const addProduct = createAsyncThunk(
  'lesbases/addProduct',
  async ({name, unit_price}: {name: string, unit_price: string}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesbases/products/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          unit_price
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export default lesbasesSlice.reducer
