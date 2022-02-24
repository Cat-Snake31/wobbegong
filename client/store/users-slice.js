import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialUserState = {
  loggedIn: false,
  username: '',
  firstName: '',
  darkModePref: 'light',
};

export const login = createAsyncThunk(
  'users/getUserStatus',
  async (body) => {
    try {
      console.log('in the login Thunk function');
      const responseJSON = await fetch('/login',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const response = await responseJSON.json();
      console.log('login data: ', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    changeTheme(state) {
      state.darkModePref = (state.darkModePref === 'light') 
        ? 'dark' 
        : 'light';
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        console.log('In builder login');
        // console.log(action.payload.data);
        if(action.payload.loggedIn) {
          state = action.payload;
        }
      });
    },
  },
});

export const { changeTheme } = userSlice.actions;
export default userSlice.reducer;