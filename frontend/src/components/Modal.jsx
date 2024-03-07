import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import blankPic from "../assets/logo.png"





const Modal = (seeModal, setSeeModal) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toggleActive,token, setToken, showModal, setShowModal } = useAppContext();
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  }, [token, navigate]);

  const submitLogin = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": 'application/x-www-form-urlencoded'},
        body: `grant_type=&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`
      };
      const response = await fetch("http://127.0.0.1:8000/api/users/token/", requestOptions);
      const data = await response.json();

      if (data.access) {
        localStorage.setItem('token', data.access);
        setToken(data.access);
        navigate('/');
      } else {
        setErrorMessage("Username or password did not work.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  const handleModal = () => {
    setShowModal(false)
    navigate('/')
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  const loginVariants = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1
    }
  }
  const myModal = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '200px',
        opacity: 1,
        Transition: {
            delay: 0.5
        }
    }
}

  return (
    <AnimatePresence mode="wait">
        {seeModal && (
            <motion.div
                variants={loginVariants}
                initial='hidden'
                animate='visible'

                // className="fixed top-0 bottom-0 right-0 left-0  p-10"
                className="h-screen text-white inset-0 bg-gray-600 bg-opacity-50 backdrop-filter 
                backdrop-blur-sm z-50 flex justify-center flex-col items-center overflow-hidden fixed"
            >
            <div className="fixed top-0 left-5">
              <div className='mt-5 flex flex-row items-center'>
              <Link to="/">
              <img onClick={toggleActive} className='w-10 h-10 rounded-full' src={ blankPic } />
              </Link>
              <Link to="/">
              <button onClick={toggleActive} className='text-xl font-extrabold'><span className="text-orange-500">DEV</span>LOOP</button>
              </Link>
            </div>
            </div>
                <motion.form 
                variants={myModal}
                onSubmit={handleSubmit}
                className="bg-gradient-to-r from-black via-black to-blue-900 p-10 flex flex-col rounded-lg text-white">
                    <h1 className="mb-5 text-orange-500 text-3xl">Login</h1>
                    <div className="mb-5">
                      <label className="text-lg">Username:</label>
                      <div className="">
                          <input 
                          type="text" 
                          placeholder="Enter username" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                          className="p-2 rounded-lg"
                          />
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="text-lg">Password:</label>
                      <div className="">
                          <input 
                          type="password" 
                          placeholder="Enter Password:" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          className="p-2 rounded-lg"
                          />
                      </div>
                    </div>
                    {/* {errorMessage && <p>{errorMessage}</p>} */}
                    <br />
                    <div className="flex gap-5">
                    <button className="border p-2 rounded-lg border-[#004D74] hover:border-white" type="submit">Login</button>
                    <button className="border p-2 rounded-lg border-[#004D74] hover:border-white"  onClick={handleModal}>Cancel</button>
                    </div>
                </motion.form>
            </motion.div>
        )}
    </AnimatePresence>
  );
};

export default Modal;