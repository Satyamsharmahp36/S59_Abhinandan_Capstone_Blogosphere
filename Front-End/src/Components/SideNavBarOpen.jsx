import React from 'react';
import '../Css/SideNavBarOpen.css';
import Dashboard from '../assets/Dashboard.png';
import search from '../assets/search.png';
import post from '../assets/post.png';
import like from '../assets/like.png';
import signOut from '../assets/logout.png';
import leftArr from '../assets/left-arrow.png';

function SideNavBarOpen({ toggleSideNav }) {
    
  const handleClick = () => {
    toggleSideNav();
  }

  return (
    <div className='snContainer'>
      <div className='sideNav'>
        <div className='snTop'>
          <button className='snButtons' title='Dashboard'>
            <img src={Dashboard} className="sideNavIcons" alt="Dashboard" />
            <span>Dashboard</span>
          </button>
          <button className='snButtons' title='Search'>
            <img src={search} className="sideNavIcons" alt="Search" />
            <span>Search</span>
          </button>
          <button className='snButtons' title='Posts'>
            <img src={post} className="sideNavIcons" alt="Post" />
            <span>Posts</span>
          </button>
          <button className='snButtons' title='Liked Posts'>
            <img src={like} className="sideNavIcons" alt="Like" />
            <span>Liked Posts</span>
          </button>
        </div>
        <div className='snBottom' title='Sign out'>
          <button className='snButtons'>
            <img src={signOut} className="sideNavIcons" alt="Logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <button className='toggleBTN' onClick={handleClick}>
        <img src={leftArr} className="sideNavIcons" alt="Toggle" />
      </button>
    </div>
  );
}

export default SideNavBarOpen;
