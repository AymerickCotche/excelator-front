import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface size {
  id?: number
  name: string
  symbol: string
}

interface course {
  id?: number
  name: string
  price: number
}

interface meal {
  id?: number
  type: string
  prix: number
  name: string
}

//TODO rename avec nom de variable de django
interface runner {
  id?: number
  firstname: string;
  lastname: string;
  sexe: string;
  birth_date: string;
  shirt_size: number;
  course: number;
  meal_before: boolean;
  meal_after: boolean;
  total?: number;
}

export interface GrandraidState {
  openModalAddRunner: boolean;
  test: string;
  runnerForm: {
    firstname: string;
    lastname: string;
    sexe: string;
    birthday: string;
    category: string;
    shirtSize: string;
    course: string;
    mealbefore: boolean;
    mealafter: boolean;
    total: number;
  }
  runners: {
    data: runner[]
    error: boolean
    loading: boolean
  }
  meals: {
    data: meal[]
    error: boolean
    loading: boolean
  }
  courses: {
    data: course[]
    error: boolean
    loading: boolean
  }
  sizes: {
    data: size[]
    error: boolean
    loading: boolean
  }
}

const initialState: GrandraidState = {
  openModalAddRunner: false,
  test: "yo",
  runnerForm: {
    firstname: "",
    lastname: "",
    sexe: "",
    birthday: "",
    category: "",
    shirtSize: "",
    course: "",
    mealbefore: false,
    mealafter: false,
    total: 0,
  },
  runners: {
    data: [],
    error: false,
    loading: false,
  },
  meals: {
    data: [],
    error: false,
    loading: false,
  },
  courses: {
    data: [],
    error: false,
    loading: false,
  },
  sizes: {
    data: [],
    error: false,
    loading: false,
  }
}

export const grandraidSlice = createSlice({
  name: "grndraid",
  initialState,
  reducers: {
    toggleAddRunner(state, action: PayloadAction<boolean>) {
      state.openModalAddRunner = action.payload;
    },
    setRunnerForm: <K extends keyof GrandraidState["runnerForm"]>(
      state: GrandraidState,
      action: PayloadAction<{ field: K; value: GrandraidState["runnerForm"][K] }>
    ) => {
      const { field, value } = action.payload;
      state.runnerForm[field] = value; // On accède ici à runnerForm correctement
    },
    resetRunnerForm(state) {
      state.runnerForm = initialState.runnerForm
    },
    setRunnerformTotal(state, action) {
      state.runnerForm.total = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses.loading = false
        state.courses.data = action.payload
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.courses.loading = false
        state.courses.error = true
      })
      .addCase(fetchAllCourses.pending, (state, action) => {
        state.courses.loading = true
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.meals.loading = false
        state.meals.data = action.payload
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.meals.loading = false
        state.meals.error = true
      })
      .addCase(fetchAllMeals.pending, (state, action) => {
        state.meals.loading = true
      })
      .addCase(fetchAllSizes.fulfilled, (state, action) => {
        state.sizes.loading = false
        state.sizes.data = action.payload
      })  
      .addCase(fetchAllSizes.rejected, (state, action) => {
        state.sizes.loading = false
        state.sizes.error = true
      })
      .addCase(fetchAllSizes.pending, (state, action) => {
        state.sizes.loading = true
      })
      .addCase(fetchAllRunners.fulfilled, (state, action) => {
        state.runners.loading = false
        state.runners.data = action.payload
      })
      .addCase(fetchAllRunners.rejected, (state, action) => {
        state.runners.loading = false
        state.runners.error = true
      })
      .addCase(fetchAllRunners.pending, (state, action) => {
        state.runners.loading = true
      })
  }
})

export const { toggleAddRunner, setRunnerForm, resetRunnerForm, setRunnerformTotal } = grandraidSlice.actions

export const fetchAllRunners = createAsyncThunk(
  'grandraid/fetchAllRunners',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runners/`)
      return (await response.json())
  }
)

export const fetchAllMeals = createAsyncThunk(
  'grandraid/fetchAllMeals',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/meals/`)
      return (await response.json())
  }
)

export const fetchAllCourses = createAsyncThunk(
  'grandraid/fetchAllCourses',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/courses/`)
      return (await response.json())
  }
)

export const fetchAllSizes = createAsyncThunk(
  'grandraid/fetchAllSizes',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/sizes/`)
      return (await response.json())
  }
)

export const insertRunner = createAsyncThunk(
  'grandraid/insertRunner',
  async ({data} : {data: runner}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runners/`, {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export default grandraidSlice.reducer
