import { configureStore } from '@reduxjs/toolkit'
import { costingSlice } from './slices/costing/costingSlice'





export const store = configureStore({
  reducer: {
    costing:costingSlice.reducer
  },
})

