import React from 'react'
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="navigationBar">
            <img src={logo} alt="logo" className="w-28 object-contain"  />

            <button
            type='button'
            onclick={() => window.open('https://github.com/MohsinRehman12/simplifAI')}
            className='black_btn'
            >
            Github
            </button>
        </nav>

        <h1 className="head_text">
            Simplify Articles using <br 
            className='max-md:hidden'
            />
            <span className="orange_gradient">OpenAI's GPT</span>
        </h1>

        <h2 className="desc">
            SimplifAI is a tool that uses OpenAI's GPT-4 model to summarize articles and make them easier to read.
        </h2>
    </header>
  )
}

export default Hero