import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/Context";
import * as ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Projects from './Projects';
import blankPic from "../assets/user.jpg"
import Header from './Header';
const profilesUrl = 'http://127.0.0.1:8000/api/profiles/';




function Profiles() {
  const [skills, setSkills] = useState([]);
  const [profiles, setProfiles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { toggleActive,token, setToken, showModal, setShowModal, user, setUser } = useAppContext();
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
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  }, []);
  
  if (loading) {
  return <div>Loading...</div>; 
  }

  return (
    <div className='bg-[#EFF5F5] text-black'>
      <Header />
      <div className='px-5 mb-10 bg-[#004D74] flex flex-col gap-6'>
        <div className='flex flex-row gap-1 items-center'>
            <input type="text" placeholder='Search for developers' className='rounded-lg w-full p-3 my-3'/>
            {/* <button className='text-white bg-[#004D74] p-2 items-center border border-3 hover:bg-white hover:text-[#004D74] rounded-lg'>Search</button> */}
        </div>
      </div>
      <div className='flex flex-wrap justify-center'>
        {profiles.map((profile) => (
          <div key={profile.id} className=' w-96  bg-blue-100 m-10 rounded-lg shadow-lg'>
            <div className='p-4 flex flex-col'>
              <div className='flex'>
                  <img className='w-20 h-20 rounded-full border border-white border-3'
                  src={ blankPic } />
                <div className='ml-3'>
                  <Link to="/user" >
                  <div onClick={() => handleProfileClick(profile.name)} className='mt-2 mb-3 font-extrabold'>{profile.name}</div>
                  </Link>
                  <div className='mt-2 mb-3'>{profile.short_Intro}</div>
                </div>
              </div>
              <div>
                <div className=' mt-2 mb-3 line-clamp-3 max-w-prose'>{profile.bio}</div>
              </div>
              <div className='flex flex-row gap-2'>
                {skills.map((skill) => (
                  skill.owner.name === profile.name ? (
                    <div key={skill.id} className='text-blue-900 cursor-pointer'>{skill.name} </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Profiles;
