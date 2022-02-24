import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialUserState = {
  loggedIn: false,
  username: '',
  firstName: '',
  darkModePref: 'light',
};

export const loginThunk = createAsyncThunk(
  'users/getUserStatus',
  async (body) => {
    try {
      console.log('in the login Thunk function, body:', body);
      const responseJSON = await fetch('/user/login',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const response = await responseJSON.json();
      console.log('login data response: ', response);
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
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log('In builder login, loggedIn:', action.payload);
      if(action.payload.loggedIn) {
        state.loggedIn = action.payload.loggedIn;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.darkModePref = action.payload.darkModePref;
      }
    });
  },
});

export const { changeTheme } = userSlice.actions;
export default userSlice.reducer;