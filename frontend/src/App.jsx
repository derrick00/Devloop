import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from './context/Context'
import Header from './components/Header';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Login from './components/Login';
import User from './components/User';
import Navigation from './components/Navigation';
import { Footer } from './components/Footer';



function App() {
  const [seeModal, setSeeModal] = useState(true);
  const location = useLocation();



  return (
    <>
    
      <Navigation/>
      <Login setSeeModal={setSeeModal} seeModal={seeModal} />
      {/* <Loader /> */}
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route 
            path="/" 
            element={<Profiles />} 
          />
          <Route 
            path="/user" 
            element={<User />} 
          />            
          <Route 
            path="/projects" 
            element={<Projects />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/logout" 
            element={<Login />} 
          />
        </Routes>
        <Footer />
      </AnimatePresence>

    </>
  );
}
export default App;

