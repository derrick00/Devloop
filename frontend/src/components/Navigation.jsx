import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useAppContext } from '../context/Context';
import { useNavigate, Link  } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blankPic from "../assets/logo.png"
import Login from './Login';
import { Slider } from './Slider';


function Navigation() {
  const { token, logout, isActive, toggleActive, showModal, setShowModal } = useAppContext();

  const tabs = [
    { name: 'Developers', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleLogout = () => {
    localStorage.removeItem('token')
    logout();
  };

  const handleModal = () => {
    setShowModal(true)
  };

    return (
      <div className=" bg-gradient-to-r from-black via-black to-blue-900 text-white">
        <div className=' p-5  flex flex-row justify-between'>
            <div className='flex flex-row items-center justify-center'>
              <Link to="/">
              <img className='w-10 h-10 rounded-full' src={ blankPic } />
              </Link>
              <Link to="/">
              <button className='text-xl font-extrabold '><span className='text-orange-500 '>DEV</span>LOOP</button>
              </Link>
            </div>
            <div className='flex flex-row gap-4'>
            {tabs.map((tab, index) => (
                <Link 
                  key={index}
                  to={tab.path}
                  onClick={() => setActiveTab(tab.name)}
                  className={`text-sm p-3 items-center cursor-pointer hidden tablet:block rounded-lg border border-[#004D74] hover:border-white transition duration-300 ease-in-out ${
                    activeTab === tab.name ? 'bg-blue-900 text-white border-white' : 'text-gray-300'
                  }`}
                >
                  {tab.name}
                </Link>
            ))}

              {token ? (
                <span className='text-sm  p-3 cursor-pointer items-center rounded-lg hidden tablet:block border border-[#004D74] hover:text-[#004D74] hover:bg-[#EFF5F5] transition duration-300 ease-in-out' onClick={handleLogout}> Logout</span>  
              ) : (

                <span className='text-sm  p-3 cursor-pointer items-center rounded-lg hidden tablet:block border border-[#004D74] hover:text-[#004D74] hover:bg-[#EFF5F5] transition duration-300 ease-in-out' onClick={handleModal}> Login</span>  

              )}

            </div>

            {isActive ? (
              <Slider />
            ) : (
              null
            )}

            <div className={`z-40 mr-6 fixed flex right-0 flex-col cursor-pointer ${isActive ? 'active-class' : 'inactive-class'}`} onClick={toggleActive}>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? 'opacity-0' : ''}`}></span>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? 'translate-y-2  -rotate-45' : ''}`}></span>
              <span className={`w-8 h-1 mt-0.5 mb-0.5 mx-auto bg-white tablet:hidden transition-all duration-300 ease-in-out ${isActive ? '-translate-y  rotate-45' : ''}`}></span>          
            </div> 
        </div>
      </div>
    );
  }
  export default Navigation
  

