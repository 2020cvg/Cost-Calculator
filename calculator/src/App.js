import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Employee from './components/employee/Employee';
import Alert from './components/layout/Alert';


// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Employee />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
