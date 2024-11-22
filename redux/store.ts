import { configureStore } from '@reduxjs/toolkit'

import grandraidSlice from './features/grandraid/grandraidSlice';
import lesbasesSlice from './features/lesbases/lesbasesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      grandraid: grandraidSlice,
      lesbases: lesbasesSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']