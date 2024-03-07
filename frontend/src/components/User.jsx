import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import blankPic from "../assets/user.jpg";
import blankPic2 from "../assets/project.jpg"
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillMessage } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";



function User() {
  const [skills, setSkills] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { user, token, showBanner, setShowBanner } = useAppContext(); 
  const profilesUrl = 'http://127.0.0.1:8000/api/profiles/';
  const projectsUrl = 'http://127.0.0.1:8000/api/projects/';
  const navigate = useNavigate(); 
  const [selectedTab, setSelectedTab] = useState('About');


  // useEffect(() => {
  //   if (!token) {
  //     setShowBanner(true); // Show the banner if not authenticated
  //     // Delayed redirect can enhance user experience
  //     const timer = setTimeout(() => {
  //       navigate('/');
  //     }, 2000); // Adjust delay as needed
  
  //     // Cleanup function to clear the timer if the component unmounts
  //     return () => clearTimeout(timer);
  //   } else {
  //     setShowBanner(false); // Hide banner if authenticated
  //   }
  // }, [token, navigate, setShowBanner]);

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

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/skills/');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(profilesUrl);
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch(projectsUrl);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } 
    };
    fetchSkills();
    fetchData();
    fetchProjects()
  }, [token]);


  const handleModal = () => {
    setShowBanner(false)
    setShowModal(true)
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };


  const pageVariants = {
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

  const contentVariants = {
    hidden:{
        opacity:0,
        x:-250
    },
    visible:{
        opacity:1,
        x:0,
        transition: {
          type:'tween',
          delay:0.25,
        }
    },
    exit:{
      x:-250
    },
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  
  const About = () => {
    return(
      <AnimatePresence mode="wait">
        <motion.div
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {profiles.map((profile) => (
            user === profile.name ? (   
              <div className='p-2'>
                <div className='text-sm'>{profile.short_Intro}</div>
                <div className='text-sm'>{profile.bio}</div>
              </div>
            ) : null
          ))}
        </motion.div>
      </AnimatePresence>
    )}


  const Skills = () => {
    return(
      <AnimatePresence mode="wait">
        <motion.div
        variants={contentVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        >
          {profiles.map((profile) => (
            user === profile.name ? (   
              <div className='p-2'>
                {skills.map((skill) => (
                  skill.owner.name === profile.name ? (
                    <div key={skill.id} className='gap-2 cursor-pointer'>
                      <div>
                        <p className='text-md'>{skill.name}</p>
                        <p className='mx-3 text-sm'>{skill.description}</p>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            ) : null
          ))}
        </motion.div>
      </AnimatePresence>
    )
  }
  const Projo = () => {
    return(
      <AnimatePresence mode="wait">
        <motion.div
        variants={contentVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        >
          {profiles.map((profile) => (
            user === profile.name ? (   
              <div className='p-2'>
                <div className='flex flex-wrap justify-center'>
                {projects.map((project) => (
                  profile.name === project.owner.name ? (
                  <div 
                  key={project.id} 
                  className='laptop:w-80 phone:w-full  bg-blue-100 m-4 rounded-lg shadow-lg'
                  >
                    <img className='rounded-lg'
                      src={ blankPic2 } />
                    <div className='m-5'>
                      <div className='text-xl text-[#004D74] font-extrabold'>{project.title}</div>
                      <div className='flex'>
                        <div className='mt-2 mmb-2 font-bold '>
                          {project.vote_ratio}%
                        </div>
                        <div className='mt-2 mmb-2'>
                          Positive Feedback({project.vote_total})
                        </div>
                      </div>
                      <div className='mt-2 mmb-2 flex flex-row gap-1 text-blue-900 underline underline-offset-1 cursor-pointer'>
                        {project.tags.map((tag) => (
                          <span>{tag.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  ) : null
                ))}
        
                </div>
              </div>
            ) : null
          ))}

        </motion.div>
      </AnimatePresence>
    )
  }


  const handleMessage = () => {
    if (token) {
      alert("Can't send messages at the moment")
    }
  }



  return (
    <AnimatePresence mode="wait">
      <motion.div 
      variants={pageVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      className='px-8 bg-gradient-to-r from-black via-black to-blue-900 text-zinc-400'
      >
        <div className='bg-black flex flex-wrap justify-center rounded-lg'>
          {profiles.map((profile) => (
            user === profile.name ? (
              <div key={profile.id} className=''>
                <div className='p-2 flex flex-col gap-3 relative'>
                  <div className='px-20  flex flex-col items-center gap-1'>
                    <img className='w-60 rounded-full border border-[#004D74] border-3' src={blankPic} alt="Profile"/>
                    <p className='text-3xl text-[#004D74] font-black'>{profile.name}</p>
                    <div>Based in  {profile.location}</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span  
                    onClick={handleMessage} 
                    className=''>
                      <FaRegMessage className='h-10 w-10 hover:text-blue-900' />                    
                    </span>
                  </div>
                  <div className='flex gap-4 items-center justify-center text-blue-900'>
                    <span
                      className={`border border-black p-2 px-4 rounded-lg cursor-pointer hover:border-zinc-700 ${
                        selectedTab === 'About' ? 'bg-blue-700 text-white' : ''
                      }`}
                      onClick={() => handleTabClick('About')}
                    >
                      About
                    </span>
                    <span
                      className={`border border-black p-2 px-4 rounded-lg cursor-pointer hover:border-zinc-700 ${
                        selectedTab === 'Skills' ? 'bg-blue-700 text-white' : ''
                      }`}
                      onClick={() => handleTabClick('Skills')}
                    >
                      Skills
                    </span>
                    <span
                      className={`border border-black p-2 px-4 rounded-lg cursor-pointer hover:border-zinc-700 ${
                        selectedTab === 'Projects' ? 'bg-blue-700 text-white' : ''
                      }`}
                      onClick={() => handleTabClick('Projects')}
                    >
                      Projects
                    </span>
                  </div>
                  {selectedTab === 'About' && <About />}
                  {selectedTab === 'Skills' && <Skills />}
                  {selectedTab === 'Projects' && <Projo />}
                </div>
              </div>
            ) : null
          ))}

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
          )}
        </div>
      </motion.div>
    </AnimatePresence>

  );
}
export default User;


export function Popover1() {
  const [openPopover, setOpenPopover] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
 
  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button variant="text">Profile Info</Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <Button
            variant="gradient"
            size="sm"
            className="font-medium capitalize"
          >
            Follow
          </Button>
        </div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 flex items-center gap-2 font-medium"
        >
          <span>Tania Andrew</span> •{" "}
          <a href="#" className="text-md font-medium text-gray-900">
            @emmaro
          </a>
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal text-blue-gray-500"
        >
          Frontend Developer • Major interest in Web Development: motivated to
          achieve measurable results, to deepen my knowledge and improve my
          skills.
        </Typography>
        <div className="mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4">
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-sm font-normal text-blue-gray-500"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM2.332 6.027C2.70329 4.96372 3.36579 4.0261 4.244 3.321C4.512 3.73 4.974 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5V6C7 6.53043 7.21071 7.03914 7.58579 7.41421C7.96086 7.78929 8.46957 8 9 8C9.53043 8 10.0391 7.78929 10.4142 7.41421C10.7893 7.03914 11 6.53043 11 6C10.9998 5.55242 11.1498 5.11773 11.4259 4.76547C11.702 4.41321 12.0883 4.16375 12.523 4.057C13.4773 5.14867 14.0022 6.55002 14 8C14 8.34 13.972 8.675 13.917 9H13C12.4696 9 11.9609 9.21071 11.5858 9.58579C11.2107 9.96086 11 10.4696 11 11V13.197C10.0883 13.7245 9.05331 14.0015 8 14V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4.00018 7.527 3.83271 7.06924 3.52733 6.70803C3.22195 6.34681 2.79844 6.10552 2.332 6.027Z"
                fill="#90A4AE"
              />
            </svg>
            United Kingdom
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-sm font-normal text-blue-gray-500"
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                fill="#90A4AE"
              />
            </svg>
            Material Tailwind
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
}