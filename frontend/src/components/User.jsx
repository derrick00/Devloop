import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import blankPic from "../assets/user.jpg";
import blankPic2 from "../assets/project.jpg"


function User() {
  const [skills, setSkills] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { user, token } = useAppContext(); 
  const profilesUrl = 'http://127.0.0.1:8000/api/profiles/';
  const projectsUrl = 'http://127.0.0.1:8000/api/projects/';
  const navigate = useNavigate(); 


  useEffect(() => {
    if (!token) {
      alert("login to view user details")
      navigate('/'); 
      return;
    }


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
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

const handleMessage = () => {
  if (token) {
    alert("Can't send messages at the moment")
  }
}

  return (
    <div className='p-2 bg-[#EFF5F5] text-black'>
      <div className='flex flex-wrap justify-center'>
        {profiles.map((profile) => (
          user === profile.name ? (
            <div key={profile.id} className=''>
              <div className='p-2 flex flex-col gap-3'>
                <div className='px-20  flex flex-col items-center gap-1 border rounded-right-25p'>
                  <img className='w-60 rounded-full border border-[#004D74] border-3' src={blankPic} alt="Profile"/>
                  <p className='text-3xl text-[#004D74] font-black'>{profile.name}</p>
                  <div className='text-lg'>{profile.short_Intro}</div>
                  <div>Based in  {profile.location}</div>
                </div>
                <div className='flex flex-col items-center'>
                  <span  onClick={handleMessage} className='font-bold text-white border border-2 border-[#004D74]
                   p-2 rounded-lg cursor-pointer bg-[#004D74] hover:bg-white hover:border-[#004D74] hover:text-[#004D74] transition duration-500 ease-in-out'>Send Message</span>
                </div>
                <div>
                  <div className='text-xl font-bold text-[#004D74]'>ABOUT ME</div>
                  <div className='text-sm'>{profile.bio}</div>
                </div>
                <div>
                  <div className='text-xl font-bold text-[#004D74]'>SKILLS</div>
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
                <div className='p-2'>
                  <div className='text-xl font-bold text-[#004D74]'>PROJECTS</div>
                  <div className='flex flex-wrap justify-center'>
                  {projects.map((project) => (
                    profile.name === project.owner.name ? (
                    <div key={project.id} className='laptop:w-80 phone:w-full  bg-blue-100 m-4 rounded-lg shadow-lg'>
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

              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}

export default User;
