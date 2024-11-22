import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Size {
  id?: number
  name: string
  symbol: string
}

interface Course {
  id?: number
  name: string
  price: number
}

interface Meal {
  id?: number
  type: string
  prix: number
  name: string
}

export interface Runner {
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

interface RunnerCategory {
  id?: number
  start_year : number
  end_year :number
  category : string
  created? : string
}

export interface GrandraidState {
  openModalAddRunner: boolean;
  openModalEditRunner: boolean;
  test: string;
  runnerForm: {
    firstname: string;
    lastname: string;
    sexe: string;
    birth_date: string;
    shirt_size: string;
    course: string;
    meal_before: boolean;
    meal_after: boolean;
    total: number;
  }
  runners: {
    data: Runner[]
    selectedRunner: Runner
    error: boolean
    loading: boolean
  }
  meals: {
    data: Meal[]
    error: boolean
    loading: boolean
  }
  courses: {
    data: Course[]
    error: boolean
    loading: boolean
  }
  sizes: {
    data: Size[]
    error: boolean
    loading: boolean
  }
  runnerCategories: {
    data: RunnerCategory[]
    error: boolean
    loading: boolean
  }
}

const initialState: GrandraidState = {
  openModalAddRunner: false,
  openModalEditRunner: false,
  test: "yo",
  runnerForm: {
    firstname: "",
    lastname: "",
    sexe: "H",
    birth_date: "",
    shirt_size: "1",
    course: "1",
    meal_before: false,
    meal_after: false,
    total: 0,
  },
  runners: {
    data: [],
    selectedRunner: {
      id: 0,
      firstname: "",
      lastname: "",
      sexe: "",
      birth_date: "",
      shirt_size: 0,
      course: 0,
      meal_before: false,
      meal_after: false,
      total: 0,
    },
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
  },
  runnerCategories: {
    data: [],
    error: false,
    loading: false
  }
}

export const grandraidSlice = createSlice({
  name: "grndraid",
  initialState,
  reducers: {
    toggleAddRunner(state, action: PayloadAction<boolean>) {
      state.openModalAddRunner = action.payload;
    },
    toggleEditRunner(state, action: PayloadAction<boolean>) {
      state.openModalEditRunner = action.payload;
    },
    setRunnerForm: <K extends keyof GrandraidState["runnerForm"]>(
      state: GrandraidState,
      action: PayloadAction<{ field: K; value: GrandraidState["runnerForm"][K] }>
    ) => {
      const { field, value } = action.payload;
      state.runnerForm[field] = value; // On accède ici à runnerForm correctement
    },
    setEditRunnerForm: <K extends keyof GrandraidState["runners"]["selectedRunner"]>(
      state: GrandraidState,
      action: PayloadAction<{ field: K; value: GrandraidState["runners"]["selectedRunner"][K] }>
    ) => {
      const { field, value } = action.payload;
      state.runners.selectedRunner[field] = value; // On accède ici à runnerForm correctement
    },
    resetRunnerForm(state) {
      state.runnerForm = initialState.runnerForm
    },
    setRunnerformTotal(state, action) {
      state.runnerForm.total = action.payload
    },
    setRunnerEditFormTotal(state, action) {
      state.runners.selectedRunner.total = action.payload
    },
    setSelectedRunner(state, action) {
      state.runners.selectedRunner = action.payload
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
      .addCase(fetchAllRunnerCategories.fulfilled, (state, action) => {
        state.runnerCategories.loading = false
        state.runnerCategories.data = action.payload
      })
      .addCase(fetchAllRunnerCategories.rejected, (state, action) => {
        state.runners.loading = false
        state.runnerCategories.error = true
      })
      .addCase(fetchAllRunnerCategories.pending, (state, action) => {
        state.runnerCategories.loading = true
      })
      .addCase(insertRunner.fulfilled, (state, action) => {
        state.runners.loading = false
        state.runners.data.push(action.payload)
      })
      .addCase(insertRunner.rejected, (state, action) => {
        state.runners.loading = false
        state.runners.error = true
      })
      .addCase(insertRunner.pending, (state, action) => {
        state.runners.loading = true
      })
      .addCase(deleteRunner.fulfilled, (state, action) => {
        state.runners.loading = false
        state.runners.data = state.runners.data.filter(runner => runner.id !== action.payload)

      })
      .addCase(deleteRunner.rejected, (state, action) => {
        state.runners.loading = false
        state.runners.error = true
      })
      .addCase(deleteRunner.pending, (state, action) => {
        state.runners.loading = true
      })
      .addCase(editRunner.fulfilled, (state, action) => {
        state.runners.loading = false
        state.runners.data = state.runners.data.map(runner =>
          runner.id === action.payload.id ? { ...action.payload } : runner
        )

      })
      .addCase(editRunner.rejected, (state, action) => {
        state.runners.loading = false
        state.runners.error = true
      })
      .addCase(editRunner.pending, (state, action) => {
        state.runners.loading = true
      })
  }
})

export const { toggleAddRunner, setRunnerForm, resetRunnerForm, setRunnerformTotal, toggleEditRunner, setSelectedRunner, setEditRunnerForm, setRunnerEditFormTotal } = grandraidSlice.actions

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

export const fetchAllRunnerCategories = createAsyncThunk(
  'grandraid/fetchAllRunnerCategories',
  async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runnercategories/`)
      return (await response.json())
  }
)

export const insertRunner = createAsyncThunk(
  'grandraid/insertRunner',
  async ({newRunner}: {newRunner : Runner}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runners/`, {
        method:'POST',
        body: JSON.stringify(newRunner),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export const deleteRunner = createAsyncThunk(
  'grandraid/deleteRunner',
  async ({id}: {id : number}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runners/${id}/`, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      return id
  }
)

export const editRunner = createAsyncThunk(
  'grandraid/editRunner',
  async ({editedRunner}: {editedRunner : Runner}) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grandraid/runners/${editedRunner.id}/`, {
        method:'PUT',
        body: JSON.stringify(editedRunner),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return (await response.json())
  }
)

export default grandraidSlice.reducer
