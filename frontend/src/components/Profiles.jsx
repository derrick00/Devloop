import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/Context";
import * as ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Projects from './Projects';
import blankPic from "../assets/user.jpg"
import Header from './Header';
import { HoverEffect } from "./ui/profiles_cards";
const profilesUrl = 'http://127.0.0.1:8000/api/profiles/';
import Loader from './Loader';


function Profiles() {
  const [skills, setSkills] = useState([]);
  const [profiles, setProfiles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { toggleActive,token, setToken, showModal, setShowModal, user, setUser, setShowLoader } = useAppContext();
  const navigate = useNavigate(); 


  const handleProfileClick = (profileName) => {
    setUser(profileName);
    navigate('/user');
  };


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/skills/')
    .then(respons => respons.json())
    .then(dat => setSkills(dat))
    .catch(error => console.error(error));
    console.log("skills", skills)


      const fetchData = async () => {
        try {
          const response = await fetch(profilesUrl);
          const data = await response.json();
          setProfiles(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  }, []);
  
  if (loading) {
  return <div>loading...</div>; 
  }

  return (
    <div className='bg-gradient-to-r from-black via-black to-blue-900 text-black'>
      <Header />

      <div className='px-5 mb-10  flex flex-col gap-6'>
        <div className='flex flex-row gap-1 items-center'>
            <input type="text" placeholder='Search for developers' className='rounded-lg w-full p-3 my-3'/>
        </div>
      </div>
      <div className=" bg-gradient-to-r from-black via-black to-blue-900 max-w-5xl mx-auto px-8">
        <HoverEffect handleProfileClick={handleProfileClick} items={profiles} />
      </div>
    </div>
  );
}
export default Profiles;
