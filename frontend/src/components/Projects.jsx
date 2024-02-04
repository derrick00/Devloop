import React, { useState, useEffect } from 'react';
import blankPic from "../assets/project.jpg"
const projectsUrl = 'http://127.0.0.1:8000/api/projects/';
import Header from './Header';

function Projects() {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(projectsUrl);
        const data = await response.json();
        setProjects(data);
        console.log(data);
        console.log(projects.tags);
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
            <input type="text" placeholder='Search for projects' className='rounded-3xl w-full p-3 my-3'/>
            {/* <button className='text-white bg-[#004D74] p-2 items-center border border-3 hover:bg-white hover:text-[#004D74] rounded-lg'>Search</button> */}
        </div>
      </div>
      <div className='flex flex-wrap justify-center'>
        {projects.map((project) => (
          <div key={project.id} className='laptop:w-80 phone:w-96  bg-blue-100 m-10 rounded-lg shadow-lg'>
            <img className='rounded-lg'
            src={ blankPic } />
            {/* info part */}
            <div className='m-5'>
              <div className='mt-2 mb-3 font-extrabold'>{project.title}</div>
              <div className='mt-2 mb-2 text-blue-900 cursor-pointer'>
                <span>{project.owner.name}</span>
              </div>
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
        ))}

      </div>

    </div>
  );
}

export default Projects;
