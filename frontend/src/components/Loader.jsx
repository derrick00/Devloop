import React from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import blankPic from "../assets/logo.png"

 
const loaderVariants = {
    animationOne: {
      x: [-20, 20],
      y: [0, -30],
      backgroundColor: ["#f97316", "#ffffff"], 
      transition: {
        x: {
            repeat: Infinity,
            repeatType: 'mirror',
            yoyo: true,
            duration: 0.5

        },
        y: {
            repeat: Infinity,
            repeatType: 'mirror',
            yoyo: true,
            duration: 0.25,
            ease: 'easeOut'
        },
        backgroundColor: {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 0.25,
          ease: 'easeInOut',
        }
      }
    },
    animationTwo: {
        y: [0, -40],
        transition: {
          repeat: Infinity,
          repeatType: 'mirror',
          yoyo: true,
          duration: 0.5,
          ease: 'easeOut'

        }
      }
  }

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

const Loader = () => {
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo")
  const { toggleActive,token, setToken, showModal, setShowModal, showLoader,setShowLoader } = useAppContext();

  return (
    <>
      <AnimatePresence mode="wait">
        {/* {showLoader && ( */}
          <motion.div
              variant={loginVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              // className="fixed top-0 bottom-0 right-0 left-0  p-10"
              className="text-white fixed inset-0 bg-blue-900 bg-opacity-50 backdrop-filter 
              backdrop-blur-sm z-50 flex justify-center flex-col items-center"
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
              <motion.div
              variant={myModal}
              className=" p-10 flex flex-col rounded-lg text-white">
                <motion.div className="w-4 h-4 my-5 mx-auto rounded-full bg-orange-500"
                variants={loaderVariants}
                animate={animation}
                >
                </motion.div>
                {/* <div onClick={() => cycleAnimation()}> Change Loader</div> */}
              </motion.div>
          </motion.div>
        {/* )} */}
      </AnimatePresence>
    </>
  )
}
export default Loader;