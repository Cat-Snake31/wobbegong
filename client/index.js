import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

//Components
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import MapPage from './Components/MapPage.jsx';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));