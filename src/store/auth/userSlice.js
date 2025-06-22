import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  "refresh": "",
  "access": "",
  "user": {
    "id": 1,
    "email": "admin@admin.com",
    "first_name": "admin",
    "last_name": "super",
    "role": "admin",
    "company": {
      "id": 1,
      "name": "demo"
    }
  }
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
