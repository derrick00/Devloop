import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useAppContext } from '../context/Context';
import { useNavigate, Link  } from 'react-router-dom';
import { motion } from 'framer-motion'
import blankPic from "../assets/logo.png"
import Login from './Login';


function Header() {
    const { token, logout, isActive, toggleActive, showModal, setShowModal } = useAppContext();
  
    const handleModal = () => {
      setShowModal(true)
    };
  
      return (
        <div className=" bg-[#004D74] text-white">
          <div className='px-5 flex flex-col justify-between gap-4'>
            <h2 className='text-4xl font-black font-sans text-center'>Connect with <span className='text-orange-400'>devs</span> from around the world</h2>
            <h2 className='text-md md-5 font-sans text-center'>From lines of code to connections worldwide. Building bridges in the digital realm. Let's collaborate and innovate.</h2>

            {token ? (
                null
            ) : (
                <Link to="/login">
                <button className='p-3 w-full border hover:bg-white hover:text-[#004D74] rounded-lg transition duration-300 ease-in-out' onClick={handleModal}>Sign in to access more</button>
                </Link>
            )}
          </div>
        </div>
      );
    }
    export default Header