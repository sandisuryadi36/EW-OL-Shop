import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as c from './constants'
import Axios from 'axios';
import { config } from '../axiosSet';

const axios = Axios.create({
    withCredentials: true,
})

// const port = process.env.PORT || 3001;

const initialState = {
    status: 'idle',
    loading: true,
    currentLocation: null,
    error: false,
    message: '',
    logedIn: false,
    userData: {},
    cartCount: 0,
    cartItems: [],
    totalCart: 0
}

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setSlice: (state, action) => {
            if (action.payload.logedIn) { state.logedIn = action.payload.logedIn }
            if (action.payload.userData) { state.userData = action.payload.userData }
            if (action.payload.error) { state.error = action.payload.error }
            if (action.payload.status) { state.status = action.payload.status }
            if (action.payload.loading) { state.loading = action.payload.loading }
            if (action.payload.cartCount) { state.cartCount = action.payload.cartCount }
            if (action.payload.currentLocation) { state.currentLocation = action.payload.currentLocation }
            if (action.payload.totalCart) { state.totalCart = action.payload.totalCart }
        },
        addToCart: (state, action) => { 
            state.totalCart += action.payload.price
        },
        subFromCart: (state, action) => { 
            state.totalCart -= action.payload.price
        },
        clearCart: (state, action) => { 
            state.cartCount = 0
            state.totalCart = 0
            state.cartItems = []
        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.error = false
            state.message = action.payload.message
            state.userData = (action.payload.message === "Login successfully") && action.payload.data.user
            state.logedIn = action.payload.login
            state.loading = false
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = true
            state.message = 'Login failed'
            state.loading = false
        })

        // logout
        builder.addCase(postLogout.pending, (state, action) => { 
            state.status = 'pending'
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(postLogout.fulfilled, (state, action) => { 
            state.status = 'fulfilled'
            state.error = false
            state.message = action.payload.message
            state.logedIn = action.payload.login
            state.userData = {}
            state.cartItems = []
            state.cartCount = 0
            state.loading = false
        })
        builder.addCase(postLogout.rejected, (state, action) => { 
            state.status = 'rejected'
            state.error = true
            state.message = 'Logout failed'
            state.loading = false
        })

        // me check
        builder.addCase(loginCheck.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
            state.message = ''
            state.userData = {}
            state.loading = true
        })
        builder.addCase(loginCheck.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.error = false
            state.message = action.payload.message
            state.userData = action.payload.user
            state.logedIn = action.payload.login
            state.loading = false
        })
        builder.addCase(loginCheck.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = true
            state.message = action.payload.message
            state.user = {}
            state.loading = false
        })

        // put cart
        builder.addCase(putCart.pending, (state, action) => { 
            state.status = 'pending'
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(putCart.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.error = false
            state.message = action.payload.message
            state.loading = false
        })
        builder.addCase(putCart.rejected, (state, action) => { 
            state.status = 'rejected'
            state.error = true
            state.message = 'Put cart failed'
            state.loading = false
        })

        // get cart
        builder.addCase(getCart.pending, (state, action) => { 
            state.status = 'pending'
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(getCart.fulfilled, (state, action) => { 
            state.status = 'fulfilled'
            state.error = false
            state.message = action.payload.message
            state.cartItems = action.payload.data
            let count = 0
            let total = 0
            action.payload.data.forEach(item => { 
                count += item.quantity
                total += item.total
            })
            state.cartCount = count
            state.totalCart = total
            state.loading = false
        })
        builder.addCase(getCart.rejected, (state, action) => { 
            state.status = 'rejected'
            state.error = true
            state.message = 'Get cart failed'
            state.loading = false
        })
    },
})

// login check
export const loginCheck = createAsyncThunk('loginCheck', async () => { 
    const response = await axios.get(c.API_URL + '/auth/me', config(localStorage.getItem("token")))
    return response.data
})

// post login
export const postLogin = createAsyncThunk('login', async (data) => { 
    const response = await axios.post(c.API_URL + '/auth/login', data, config(localStorage.getItem("token")));
    return response.data;
})

// post logout
export const postLogout = createAsyncThunk('logout', async () => { 
    const response = await axios.put(c.API_URL + '/auth/logout', config(localStorage.getItem("token")));
    return response.data;
})

// put cart
export const putCart = createAsyncThunk('putCart', async (data) => { 
    const response = await axios.put(c.API_URL + `/api/v1/cart`, data, config(localStorage.getItem("token")))
    return response.data;
})

// get cart
export const getCart = createAsyncThunk('getCart', async () => { 
    const response = await axios.get(c.API_URL + '/api/v1/cart', config(localStorage.getItem("token")))
    return response.data;
})

export const { setSlice, addToCart, subFromCart, clearCart } = slice.actions;
export default slice.reducer;