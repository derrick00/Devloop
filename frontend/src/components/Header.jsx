import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { useAppContext } from '../context/Context';
import { useNavigate, Link  } from 'react-router-dom';
import { motion } from 'framer-motion'
import blankPic from "../assets/logo.png"
import Login from './Login';
"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { TypewriterEffect } from "./ui/typewriter-effect"

function Header() {
    const { token, logout, isActive, toggleActive, showModal, setShowModal, showBanner, setShowBanner } = useAppContext();
 

    useEffect(() => {
      let timer;
      if (showBanner) {
        timer = setTimeout(() => {
          setShowBanner(false);
        }, 5000); 
      }
      return () => clearTimeout(timer); 
    }, [showBanner]);
  


    const bannerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        translateY: '0',
        transition: { duration: 4, ease: "easeInOut", opacity: { duration: 0.4, delay: 0.05 } }
      },
    };
  
    const progressVariants = {
      hidden: { scaleX: 0 },
      visible: {
        scaleX: 1,
        transition: { duration: 3, delay: 0.25, ease: "linear" },
      },
    };
    const handleModal = () => {
      setShowBanner(false)
      setShowModal(true)
    };
  
    const words2 = `Connect with Devs from around the world`;
    return (
      <div className=" bg-gradient-to-r from-black via-black to-blue-900  text-white">
        <div className='px-5 flex flex-col justify-between gap-4'>
          <div>
          <TextGenerateEffect className='text-center' words={words2} />
          </div>
          <h2 className='text-sm md-5 font-sans text-center'>From lines of code to connections worldwide. Building bridges in the digital realm. Let's collaborate and innovate.</h2>
          {token ? (
              null
          ) : (
              <button className='mb-5 p-3 w-full border  hover:border-white border-[#004D74]  rounded-lg transition duration-300 ease-in-out' onClick={handleModal}>Sign in to access more</button>
          )}
          {/* <div>
            <button
              onClick={() => setShowBanner(true)}
              className="p-2 bg-green-500 text-white rounded">Show Banner
            </button>
          </div>
          {showBanner && (
            <motion.div 
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            className="z-50 fixed bottom-0 right-0 p-4 bg-gray-900 rounded-lg">
              <div className='flex justify-between gap-4'>
                <div className='flex gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Login to view more developers details</span>
                </div>
                <div className='flex gap-1'>
                  <button onClick={() => setShowBanner(false)} className="btn btn-sm">Cancel</button>
                  <button  onClick={handleModal} className="btn btn-sm btn-primary">Login</button>
                </div>
              </div>
              <motion.span 
                  className="absolute inset-x-[0.625rem] bottom-[0.375rem] h-[0.25rem] bg-blue-500 rounded-full"
                  variants={progressVariants}
                  />
            </motion.div>
          )} */}
        </div>
      </div>
    );
}
export default Header


