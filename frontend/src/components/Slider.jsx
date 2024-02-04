import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';



function Slider() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

    return (
      <div className="p-4 bg-[#004D74] h-screen w-full flextablet:hidden">
        <div className=' p-2 flex align-center'>
          <button className='text-xl font-extrabold'>DEVLOOP</button>
        </div>
        <div className='flex'>
          <Link to="/">
            <span className='{text-lg p-3 items-center cursor-pointer tablet:hidden border border-4 border-blue-500 rounded-xl hover:border-blue-900 }' onClick={handleClick}>Developers</span>
          </Link>
          <Link to="/projects">
            <span className='text-lg p-3 items-center cursor-pointer tablet:hidden border border-4 border-blue-500 rounded-xl hover:border-blue-900' onClick={handleClick}>Projects</span>
          </Link>
          <Link to="/">
            <span className='text-lg p-3 items-center bg-blue-900 cursor-pointer rounded-lg tablet:hidden border border-4 border-blue-900 rounded-xl hover:bg-blue-500' onClick={handleClick}>LOGIN</span>
          </Link>
        </div>
      </div>
    );
  }
  export default Slider
  

