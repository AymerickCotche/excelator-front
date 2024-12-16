import { configureStore } from '@reduxjs/toolkit'

import grandraidSlice from './features/grandraid/grandraidSlice'
import lesbasesSlice from './features/lesbases/lesbasesSlice'
import referenceabsolueSlice from './features/referenceabsolue/referenceabsolueSlice'
import elevesSlice from './features/eleves/elevesSlice'
import facturationSlice from './features/facturation/facturationSlice'
import authSlice from './features/auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      grandraid: grandraidSlice,
      lesbases: lesbasesSlice,
      referenceabsolue: referenceabsolueSlice,
      eleves: elevesSlice,
      facturation: facturationSlice,
      auth: authSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']