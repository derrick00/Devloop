import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useAppContext } from '../context/Context';
import { useNavigate, Link  } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blankPic from "../assets/logo.png"
import Login from './Login';

export function Slider() {
    const { isActive, toggleActive,token, logout, showModal, setShowModal} = useAppContext();
    const navigate = useNavigate();
  
    const handleToggle = () => {
      toggleActive();
      console.log(showModal)
    };


    
    const handleModal = () => {
      setShowModal(true)
      !toggleActive()
    };

    const handleLogout = () => {
      logout();
      navigate('/'); 
    };
    const sliderVariants = {
      hidden: {
        y:-250
      },
      visible: {
        y:0,
        transition: {
          type:'tween'
        }
      }
    }

      return (
        <AnimatePresence mode="wait">
        {isActive && (
            <motion.div
            variants={sliderVariants}
            initial='hidden'
            animate='visible'
            exit="hidden"
            className='z-30 bg-gradient-to-r from-black via-black to-blue-900 px-10 fixed top-0 bottom-0 left-0 flex flex-col text-#EFF5F5] w-screen gap-5 tablet:hidden'>
                <div className='mt-5 flex flex-row items-center'>
                <Link to="/">
                <img onClick={toggleActive} className='w-10 h-10 rounded-full' src={ blankPic } />
                </Link>
                <Link to="/">
                <button onClick={toggleActive} className='text-xl font-extrabold'>DEVLOOP</button>
                </Link>
                </div>
                <div className=' flex flex-col gap-10 text-lg items-start '>
                <Link to="/">
                <span className=' p-2 border-[#004D74] hover:border-b-2 hover:border-[#EFF5F5]  transition duration-300 ease-in-out' onClick={toggleActive}>Developers</span>
                </Link>

                <Link to="/projects" >
                <span className='p-2 hover:border-b-2   transition duration-300 ease-in-out ' onClick={toggleActive}>Projects</span>
                </Link>


                {token ? (
                    <span className='p-2 border hover:bg-[#EFF5F5] hover:text-[#004D74]  border-[#EFF5F5] transition duration-300 ease-in-out rounded-md' onClick={handleLogout}>Log Out</span>
                ) : (
                    <span className='p-2 border hover:bg-[#EFF5F5] hover:text-[#004D74]  border-[#EFF5F5] transition duration-300 ease-in-out rounded-md'  onClick={handleModal}>Sign in</span>
                )}
                </div>
            </motion.div>
        )}
        </AnimatePresence>
      );
    }
