import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import blankPic from "../assets/logo.png"
import google from "../assets/google_bg.png"
import email from "../assets/Gmail-logo.png"




const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toggleActive,token, setToken, showModal, setShowModal } = useAppContext();
  const navigate = useNavigate(); 
  
  // useEffect(() => {
  //   if (token) {
  //     navigate('/'); 
  //   }
  // }, [token, navigate]);

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
    localStorage.removeItem('token')
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
    setShowModal(false)
    setUsername('');
    setPassword('');
  };

  const backdrop = {
    hidden:{
        opacity:0,
        y:-250
    },
    visible:{
        opacity:1,
        y:0,
        transition: {
          type:'tween'
        }
    }
  }
  const myLogin = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        Transition: {
            delay: 0.5
        }
    }
}

  return (
    <AnimatePresence mode="wait">
        {showModal && (
            <motion.div
                variants={backdrop}
                initial='hidden'
                animate='visible'
                exit='hidden'
                // className="fixed top-0 bottom-0 right-0 left-0  p-10"
                className="text-zinc-100 fixed inset-0 bg-blue-900 bg-opacity-50 backdrop-filter 
                backdrop-blur-lg z-50 flex justify-center flex-col items-center"
            >
            <div className="fixed top-0 left-5">
              <div className=' flex flex-row items-center gap-1'>
              <Link to="/">
              <img onClick={toggleActive} className='w-10 h-10 rounded-full' src={ blankPic } />
              </Link>
              <Link to="/">
              <button onClick={toggleActive} className='text-xl font-extrabold'><span className="text-orange-500">DEV</span>LOOP</button>
              </Link>
            </div>
            </div>
                <motion.form 
                variants={myLogin}
                onSubmit={handleSubmit}
                className="bg-gradient-to-r from-black via-black to-blue-900 p-10 flex flex-col rounded-lg gap-2">
                  <div>
                  <h1 className=" text-orange-500 text-3xl">Welcome back!</h1>
                  <p className="text-sm">Login with your account</p>
                  </div>


                  <div className="flex items-center text-zinc-900 bg-zinc-300 rounded-lg">
                    <button className='flex flex-row justify-center gap-2 text-md  p-1 w-full border  hover:border-white border-[#004D74]  rounded-lg transition duration-300 ease-in-out' onClick={handleModal}>
                    <img onClick={toggleActive} className='w-5 h-5' src={ google } />
                      <p>Sign in with Google</p>
                    </button>
                  </div>
                  <div className="text-zinc-900 flex items-center bg-zinc-300 rounded-lg">
                    <button className=' flex flex-row justify-center gap-2 text-md  p-1 w-full border  hover:border-white border-[#004D74]  rounded-lg transition duration-300 ease-in-out' onClick={handleModal}>
                    <img onClick={toggleActive} className=' h-5' src={ email } />
                      <p>Sign in with Email</p>
                    </button>
                  </div>
                    <div className="mb-5">
                      <label className="text-lg">Username:</label>
                      <div className="">
                          <input 
                          type="text" 
                          placeholder="Enter username" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                          className="p-2 rounded-lg bg-gradient-to-r from-black via-black to-blue-900"
                          />
                      </div>
                    </div>
                    <div className="">
                      <label className="text-lg">Password:</label>
                      <div className="">
                          <input 
                          type="password" 
                          placeholder="Enter Password:" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          className="p-2 rounded-lg bg-gradient-to-r from-black via-black to-blue-900"
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

export default Login;