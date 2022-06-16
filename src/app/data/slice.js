import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as c from './constants'
import axios from 'axios';

// const port = process.env.PORT || 3001;

const initialState = {
    status: 'idle',
    loading: true,
    currentLocation: null,
    recentAction: null,
    error: false,
    message: '',
    logedIn: false,
    userData: {},
    data: [],
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
            if (action.payload.data) {
                state.data = action.payload.data
                state.recentAction = "reset-data"
            }
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
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.userData = (action.payload.message === "Login successfully") && action.payload.data.user
            state.logedIn = action.payload.login
            state.loading = false
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Login failed'
            state.data = []
            state.loading = false
        })

        // logout
        builder.addCase(postLogout.pending, (state, action) => { 
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(postLogout.fulfilled, (state, action) => { 
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = []
            state.logedIn = action.payload.login
            state.userData = {}
            state.cartItems = []
            state.cartCount = 0
            state.loading = false
        })
        builder.addCase(postLogout.rejected, (state, action) => { 
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Logout failed'
            state.loading = false
        })

        // me check
        builder.addCase(loginCheck.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.userData = {}
            state.loading = true
        })
        builder.addCase(loginCheck.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.userData = action.payload.user
            state.logedIn = action.payload.login
            state.loading = false
        })
        builder.addCase(loginCheck.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Login failed'
            state.user = {}
            state.loading = false
        })
        
        // get product
        builder.addCase(getProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = action.payload.data
            state.loading = false
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Get product failed'
            state.data = []
            state.loading = false
        })

        // delete product
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = state.data.filter(item => item._id !== action.payload.data._id)
            state.loading = false
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Delete product failed'
            state.data = []
            state.loading = false
        })

        // post product
        builder.addCase(postProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(postProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = !state.data ? state.data.concat(action.payload.data) : []
            state.loading = false
        })
        builder.addCase(postProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Post product failed'
            state.data = []
            state.loading = false
        })

        // put product
        builder.addCase(putProduct.pending, (state, action) => {
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(putProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.data = state.data.map(item => item._id === action.payload.data._id ? action.payload.data : item)
            state.loading = false
        })
        builder.addCase(putProduct.rejected, (state, action) => {
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Put product failed'
            state.data = []
            state.loading = false
        })

        // put cart
        builder.addCase(putCart.pending, (state, action) => { 
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(putCart.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.recentAction = action.type
            state.error = false
            state.message = action.payload.message
            state.loading = false
        })
        builder.addCase(putCart.rejected, (state, action) => { 
            state.status = 'rejected'
            state.recentAction = action.type
            state.error = true
            state.message = 'Put cart failed'
            state.loading = false
        })

        // get cart
        builder.addCase(getCart.pending, (state, action) => { 
            state.status = 'pending'
            state.recentAction = action.type
            state.error = false
            state.message = ''
            state.loading = true
        })
        builder.addCase(getCart.fulfilled, (state, action) => { 
            state.status = 'fulfilled'
            state.recentAction = action.type
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
            state.recentAction = action.type
            state.error = true
            state.message = 'Get cart failed'
            state.loading = false
        })
    },
})

axios.defaults.withCredentials = true
// slice.caseReducers.setAxios()

// console.log(slice.reducer)
// axios.defaults.headers = (() => { 
//     if (slice.get('logedIn')) { 
//         return { 
//             'Authorization': `Bearer ${cookies.get('token')}`
//         }
//     }
// })

// login check
export const loginCheck = createAsyncThunk('loginCheck', async () => { 
    const response = await axios.get(c.API_URL + '/auth/me')
    return response.data
})

// post login
export const postLogin = createAsyncThunk('login', async (data) => { 
    const response = await axios.post(c.API_URL + '/auth/login', data);
    return response.data;
})

// post logout
export const postLogout = createAsyncThunk('logout', async () => { 
    const response = await axios.put(c.API_URL + '/auth/logout');
    return response.data;
})

// get product
export const getProduct = createAsyncThunk('getProducts', async (filter) => { 
    let url = ''
    if (filter) {
        url = c.API_URL + '/api/v1/product/?' + filter
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

// put cart
export const putCart = createAsyncThunk('putCart', async (data) => { 
    const response = await axios.put(c.API_URL + `/api/v1/cart`, data)
    return response.data;
})

// get cart
export const getCart = createAsyncThunk('getCart', async () => { 
    const response = await axios.get(c.API_URL + '/api/v1/cart')
    return response.data;
})

export const { setSlice, addToCart, subFromCart, clearCart } = slice.actions;
export default slice.reducer;