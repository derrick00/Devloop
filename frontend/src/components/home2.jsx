import React, { useState, useEffect } from 'react';

const projectsUrl = 'http://127.0.0.1:8000/api/projects/';

function Home() {
  const [projects, setProjects] = useState([]); // Move this line inside the function body
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(projectsUrl);
        const data = await response.json();
        setProjects(data);
        console.log(data);
        console.log(projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other UI
  }

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <div>{project.title}</div>
          <div>{project.description}</div>
          <div>{project.featured_image}</div>
          <div>{project.created}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;



<></>
// <div className="bg-gray-100 flex flex-row flex-wrap justify-around gap-10 p-6">
//   <div className='bg-gray-500 h-80 w-80'></div>
//   <div className='bg-gray-500 h-80 w-80'></div>
//   <div className='bg-gray-500 h-80 w-80'></div>
//   <div className='bg-gray-500 h-80 w-80'></div>
//   <div className='bg-gray-500 h-80 w-80'></div>
//   <div className='bg-gray-500 h-80 w-80'></div>
// </div>





import React, { useState, useEffect } from 'react';
import axios from 'axios';

const projectsUrl = 'http://127.0.0.1:8000/api/projects/';

const Project = ({ project }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const response = await axios.get(`${projectsUrl}${project.id}`);
        const projectData = await response.data;
        setImageUrl(projectData.featured_image);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageURL();
  }, [project]);

  return (
    <div>
      <img src={imageUrl} alt='project image' />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default Project;
