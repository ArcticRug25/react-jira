import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from 'screens/project-list/project-list.slice'
import { authSlice } from './auth.slice'

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth: authSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
// ReturnType 读取函数的返回值
export type RootState = ReturnType<typeof store.getState>