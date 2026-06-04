"use client"
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center mt-5">

      {/* Left Content */}
      <motion.div
        className="col-span-8 sm:pl-15 sm:pr-15 text-center sm:justify-center sm:items-center sm:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white">Hello, I&apos;m </span>
          <br/>
          <span className="bg-linear-to-r from-blue-400 to-gray-500 bg-clip-text text-transparent inline-block min-w-70 sm:min-w-80 lg:min-w-120">
            <TypeAnimation
              sequence={[
                "Vignesh T|",
                1000,
                "Full Stack Developer|",
                1000,
                "Problem Solver|",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-[#ADB7BE] text-base lg:text-lg leading-relaxed max-w-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Full-Stack Developer and competitive programmer with strong DSA fundamentals,
          experienced in building scalable web applications and AI-powered products using
          modern tech stacks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="px-10 py-4 w-full rounded-full mr-4 mb-2 hover:bg-slate-300 text-white sm:w-fit bg-linear-to-br from-black-500 via-blue-500 to-black-500 suppressHydrationWarning">
            Hire Me
          </button>
          <a href="/VigneshResume.pdf" download target="_blank" rel="noopener noreferrer">
            <button className="px-1 py-1 sm:w-fit w-full rounded-full bg-linear-to-br from-blue-500 via-blue-500 to-blue-500 hover:scale-105 transition">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-7 py-3 text-white">
                Download Resume
              </span>
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="col-span-4 flex justify-center items-center self-center order-first lg:order-last mb-8 lg:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Mobile: squircle compact headshot */}
        <div className="relative w-36 h-36 rounded-[30%] overflow-hidden border-[3px] border-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.15)] md:hidden">
          <Image
            src="/vignesh_photo.jpeg"
            alt="Vignesh T"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Desktop: squircle tall frame */}
        <div className="relative w-64 h-72 lg:w-72 lg:h-84 rounded-[30%] overflow-hidden border-[3px] border-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.15)] hidden md:block">
          <Image
            src="/vignesh_photo.jpeg"
            alt="Vignesh T"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </motion.div>

    </div>
  );
};

export default HeroSection