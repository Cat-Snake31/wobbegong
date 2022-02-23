import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialUserState = {
  loggedIn: false,
  username: '',
  firstName: '',
  darkModePref: 'light',
};

export const getUser = createAsyncThunk(
  'users/getUserStatus',
  async () => {
    try {
      console.log('in the getUser Thunk function');
      const responseJSON = await fetch('/getUser');
      const response = await responseJSON.json();
      // console.log('Here is your data: ', response);
      return;
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
});

export const { changeTheme } = userSlice.actions;
export default userSlice.reducer;