import React, { useEffect } from 'react'
import Demo from './components/Demo'
import Hero from './components/Hero'
import './App.css';

import { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {themeState} from './services/atoms';
import {BsFillSunFill } from 'react-icons/bs';
import {BsFillMoonFill} from 'react-icons/bs';
function App() {


  const [theme, setTheme] = useRecoilState(themeState);
  const onHandleClick = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
    localStorage.setItem('theme', theme === 'day' ? 'night' : 'day');

  };

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }else{
      localStorage.setItem('theme', 'night');
      setTheme('night');
    }

  }, []);

  return (
    <main>

        <div className={`main ${theme}`}>

            <div className={`gradient ${theme}`}/>
        </div>

        <div className="app">
        <button className='theme_btn' onClick={onHandleClick}>
          {theme === 'night' ? <BsFillMoonFill className='text-3xl text-blue-50'/> 
          : <BsFillSunFill className='text-3xl text-orange-500'/>}
        </button>
            <Hero />
            <Demo />
        </div>
    </main>
  )
}

export default App