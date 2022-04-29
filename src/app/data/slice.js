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
    data: []
}

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setSlice: (state, action) => {
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
        })
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.userData = (action.payload.message === "Login successfully") && action.payload.data.user
            state.logedIn = action.payload.login
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Login failed'
            state.data = null
        })

        // logout
        builder.addCase(postLogout.pending, (state, action) => { 
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.data = null
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
            state.data = null
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
            state.data = null
        })

        // delete product
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = state.data.filter(item => item._id !== action.payload.data._id)
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Delete product failed'
            state.data = null
        })

        // post product
        builder.addCase(postProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
        })
        builder.addCase(postProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = !state.data ? state.data.concat(action.payload.data) : []
        })
        builder.addCase(postProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Post product failed'
            state.data = null
        })

        // put product
        builder.addCase(putProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
        })
        builder.addCase(putProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = state.data.map(item => item._id === action.payload.data._id ? action.payload.data : item)
        })
        builder.addCase(putProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Put product failed'
            state.data = null
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

// get product
export const getProduct = createAsyncThunk('getProducts', async (filter) => { 
    let url = ''
    if (filter) {
        url = c.API_URL + '/api/v1/product' + filter
    } else { 
        url = c.API_URL + '/api/v1/product'
    }
    const response = await axios.get(url)
    return response.data
})

// delete product
export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => { 
    const response = await axios.delete(c.API_URL + '/api/v1/product/' + id)
    return response.data
})

// post product
export const postProduct = createAsyncThunk('postProduct', async (data) => { 
    const response = await axios.post(c.API_URL + '/api/v1/product', data)
    return response.data;
} )

// put product
export const putProduct = createAsyncThunk('putProduct', async (data) => { 
    const response = await axios.put(c.API_URL + `/api/v1/product/${data.id}`, data.data)
    return response.data;
})

export const { setSlice } = slice.actions;
export default slice.reducer;