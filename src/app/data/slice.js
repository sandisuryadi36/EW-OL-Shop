import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as c from './constants'
import axios from 'axios';

const initialState = {
    status: 'idle',
    recentAction: null,
    error: false,
    message: '',
    logedIn: false,
    userData: {},
    data: {}
}

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setLogout: (state, action) => {
            if (action.payload.logedIn) { state.logedIn = action.payload.logedIn }
            if (action.payload.userData) { state.userData = action.payload.userData }
            if (action.payload.error) { state.error = action.payload.error }
        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.data = {}
        })
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = action.payload.data
            state.userData = (action.payload.message === "Login successfully") && action.payload.data.user
            state.logedIn = action.payload.login
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Login failed'
            state.data = {}
        })

        // logout
        builder.addCase(postLogout.pending, (state, action) => { 
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.data = {}
        })
        builder.addCase(postLogout.fulfilled, (state, action) => { 
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = action.payload.data
            state.logedIn = action.payload.login
            state.userData = {}
        })
        builder.addCase(postLogout.rejected, (state, action) => { 
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Logout failed'
            state.data = {}
        })

        // me check
        builder.addCase(loginCheck.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.userData = {}
        })
        builder.addCase(loginCheck.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.userData = action.payload.user
            state.logedIn = action.payload.login
        })
        builder.addCase(loginCheck.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Login failed'
            state.user = {}
        })
        
        // get product
        builder.addCase(getProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.data = {}
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = action.payload.data
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Get product failed'
            state.data = {}
        })
    },
})

axios.defaults.withCredentials = true

// login check
export const loginCheck = createAsyncThunk('loginCheck', async () => { 
    const response = await axios.get(c.API_URL + '/auth/me')
    return response.data
})

// post login
export const postLogin = createAsyncThunk('login', async (data) => { 
    const response = await axios.post(c.API_URL + '/auth/login', data,
        {
            proxy: {
                host: 'localhost',
                port: 3001
            },
            withCredentials: true,
            credentials: 'include'
        }
    );
    return response.data;
})

// post logout
export const postLogout = createAsyncThunk('logout', async () => { 
    const response = await axios.put(c.API_URL + '/auth/logout', {},
        {
            proxy: {
                host: 'localhost',
                port: 3001
            },
            withCredentials: true,
            credentials: 'include'
        }
    );
    return response.data;
})

export const getProduct = createAsyncThunk('getProducts', async (id) => { 
    let url = ''
    if (id) {
        url = c.API_URL + '/api/v1/product/' + id
    } else { 
        url = c.API_URL + '/api/v1/product'
    }
    const response = await axios.get(url)
    return response.data
})

export const { setLogout } = slice.actions;
export default slice.reducer;