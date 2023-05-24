import React from 'react'
import { logo } from '../assets/';

import logo2 from '../assets/logo2.png';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {themeState} from '../services/atoms';



const Hero = () => {

  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="navigationBar">

          <div className="logoBox">
            <img src={logo2} alt="logo" className="w-10 object-contain mr-3"/>
            <p 
            className={theme==='night' ? "font-satoshi font-bold text-gray-100 text-2xl " : "font-satoshi font-bold text-gray-900 text-2xl"}> 
            
            SimplifAI'd </p>

          </div>
            
            <button
            type='button'
            onclick={() => window.open('https://github.com/MohsinRehman12/simplifAI')}
            className={theme === 'day' ? 'black_btn' : 'darkgray_btn'}
            >
            Github
            </button>
        </nav>

        <h1 className= {theme==='day'? "head_text" : "head_text_night"}>
            Simplify Articles using <br 
            className='max-md:hidden'
            />
            <span className={theme === 'night' ? "blue_gradient" : "orange_gradient" }>OpenAI's GPT</span>
        </h1>

        <h2 className="desc_night">
            SimplifAI is a tool that uses OpenAI's GPT-4 model to summarize articles and make them easier to read.
        </h2>
    </header>
  )
}

export default Hero