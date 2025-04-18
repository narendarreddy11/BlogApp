import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login thunk
export const userAuthorLoginThunk = createAsyncThunk('user-author-login', async (usercredobj, thunkApi) => {
  try {
    let res;
    if (usercredobj.userType === 'user') {
      res = await axios.post('http://localhost:4000/user-api/login', usercredobj);
    } else if (usercredobj.userType === 'author') {
      res = await axios.post('http://localhost:4000/author-api/login', usercredobj);
    }
    else if (usercredobj.userType === 'admin')
    {
      res = await axios.post('http://localhost:4000/admin-api/Adminlogin', usercredobj);

    }

    if (res.data.message === 'login success') {
      localStorage.setItem('token', res.data.token);
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.data.message);
    }
  } catch (err) {
    return thunkApi.rejectWithValue(err.message || 'Login failed');
  }
});

// Verify token thunk
export const verifyToken = createAsyncThunk('verify-token', async (token, thunkApi) => {
  try {
    const response = await axios.post('http://localhost:4000/verify-token', { token });
    if (response.data.success) {
      return response.data.user;
    } else {
      return thunkApi.rejectWithValue('Invalid token');
    }
  } catch (err) {
    return thunkApi.rejectWithValue('Token verification failed');
  }
});

const UserAuthorSlice = createSlice({
  name: 'user-author-login',
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errMsg: '',
    errOccured: false,
  },
  reducers: {
    resetstate: (state) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errMsg = '';
      state.errOccured = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthorLoginThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload;
        state.errOccured = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loginUserStatus = true;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.currentUser = {};
        state.loginUserStatus = false;
      });
  },
});

export const { resetstate } = UserAuthorSlice.actions;
export default UserAuthorSlice.reducer;
