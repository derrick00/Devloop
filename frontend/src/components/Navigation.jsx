import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useAppContext } from '../context/Context';
import { useNavigate, Link  } from 'react-router-dom';
import { motion } from 'framer-motion'
import blankPic from "../assets/logo.png"
import Login from './Login';


function Navigation() {
  const { token, logout, isActive, toggleActive, showModal, setShowModal } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const handleModal = () => {
    setShowModal(true)
  };

    return (
      <div className=" bg-[#004D74] text-white">
        <div className=' p-5  flex flex-row justify-between'>
            <div className='flex flex-row items-center justify-center'>
              <Link to="/">
              <img className='w-10 h-10 rounded-full' src={ blankPic } />
              </Link>
              <Link to="/">
              <button className='text-xl font-extrabold '><span className='text-orange-400 '>DEV</span>LOOP</button>
              </Link>
            </div>
            <div className='flex flex-row gap-4'>
              <Link to="/">
                <span className='text-sm p-3 items-center cursor-pointer hidden tablet:block border border-[#004D74] hover:border-b-white transition duration-300 ease-in-out'>Developers</span>
              </Link>
              <Link to="/projects">
                <span className='text-sm p-3 items-center cursor-pointer hidden tablet:block border border-[#004D74] hover:border-b-white transition duration-300 ease-in-out'>Projects</span>
              </Link>
              {token ? (
                <span className='text-sm  p-3 cursor-pointer items-center rounded-lg hidden tablet:block border hover:text-[#004D74] hover:bg-[#EFF5F5] transition duration-300 ease-in-out' onClick={handleLogout}> Logout</span>  
              ) : (
                <Link to="/login">
                  <span className='text-sm  p-3 cursor-pointer items-center rounded-lg hidden tablet:block border hover:text-[#004D74] hover:bg-[#EFF5F5] transition duration-300 ease-in-out' onClick={handleModal}> Login</span>  
                </Link>
              )}
            </div>

            {isActive ? (
              <Slider />
            ) : (
              null
            )}

            <div className={`mr-6 fixed flex right-0 flex-col cursor-pointer ${isActive ? !isActive : isActive}}`} onClick={toggleActive}>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? 'opacity-0' : ''}`}></span>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? 'translate-y-2  -rotate-45' : ''}`}></span>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? '-translate-y  rotate-45' : ''}`}></span>          
            </div> 
        </div>
      </div>
    );
  }
  export default Navigation
  

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
        <motion.div
        variants={sliderVariants}
        initial='hidden'
        animate='visible'
         className='px-10 fixed top-0 bottom-0 left-0 bg-[#004D74] flex flex-col text-#EFF5F5] w-screen gap-5 tablet:hidden'>
          <div className='mt-5 bg-[#004D74] flex flex-row items-center'>
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
            <span className='p-2 hover:border-b-2   transition duration-300 ease-in-out ' onClick={toggleActive}>project</span>
            </Link>


            {token ? (
                <span className='p-2 border hover:bg-[#EFF5F5] hover:text-[#004D74]  border-[#EFF5F5] transition duration-300 ease-in-out rounded-md' onClick={handleLogout}>Log Out</span>
          ) : (
            <Link to="/login">
                <span className='p-2 border hover:bg-[#EFF5F5] hover:text-[#004D74]  border-[#EFF5F5] transition duration-300 ease-in-out rounded-md'  onClick={handleModal}>Sign in</span>
            </Link>
          )}
          </div>
        </motion.div>
      );
    }
