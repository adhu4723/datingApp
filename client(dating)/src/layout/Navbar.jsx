import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  const{user}=useContext(AuthContext)
  console.log(user);
  
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid bg-white border-b-slate-200 px-4 py-4 shadow-sm">
      <Link to={'/'} className="flex items-center gap-3 text-red-600">
        <svg
          className="text-red-500"
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <h2 className="text-red-600 text-2xl font-bold leading-tight tracking-[-0.015em]">
          MatchMingle
        </h2>
      </Link>
      {!user?<Link to={'/signup'} className=''>
        <Button label={'JOIN NOW'} />
      </Link>:
      
      <div className="flex flex-1 justify-end items-center gap-4">
        <button
          aria-label="Settings"
          className="flex items-center justify-center rounded-full h-11 w-11 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border-2 border-blue-500 shadow-md"
          style={{
            backgroundImage: `url(${user?.profileImage})`
          }}
        />
      </div>
}
    </header>
  );
}

export default Navbar;
