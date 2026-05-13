"use client"
import React, { startTransition } from 'react'
import Image from 'next/image'
import {useState , useTransition} from "react"
import TabButton from './TabButton'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

//Data to be displayed in the tabs
const TAB_DATA=[
  {
    title:"Skills" ,
    id:"skills" ,
    content:(
         <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>
        <span className="font-semibold text-white">Languages:</span>{" "}
        C++, C, JavaScript (ES6+), Java, Python
      </li>

      <li>
        <span className="font-semibold text-white">Frontend:</span>{" "}
        React.js, Tailwind CSS, HTML, CSS
      </li>

      <li>
        <span className="font-semibold text-white">Backend:</span>{" "}
        Node.js, Express.js, REST APIs, Authentication 
      </li>

      <li>
        <span className="font-semibold text-white">Databases:</span>{" "}
        MongoDB, MySQL, PostgreSQL
      </li>

      <li>
        <span className="font-semibold text-white">DevOps & Tools:</span>{" "}
        Git, GitHub, Docker (Basics), Postman
      </li>

      <li>
        <span className="font-semibold text-white">Core Concepts:</span>{" "}
        Data Structures & Algorithms (DSA), OOP, DBMS
      </li>
    </ul>
      
        )
  } ,
  {
    title:"Education",
    id:"education" ,
    content:(
         <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>
        <span className="font-semibold text-white">
          B.E ECE
        </span>{" "}
        —Dhanalakshmi Srinivasan Engineering College (DSEC), Perambalur  
        <br />
        <span className="text-sm text-gray-400">
          2023 – 2027 | CGPA: 8.16
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          HSC (Class XII)
        </span>{" "}
        — Jawahar Matric Higher Secondary School
        <br />
        <span className="text-sm text-gray-400">
          2021 – 2022 | Percentage: 78.6%
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          SSC (Class X)
        </span>{" "}
        —  Jawahar Higher Secondary School (CBSE)
        <br />
        <span className="text-sm text-gray-400">
          2019 – 2020 | Percentage: 76.4%
        </span>
      </li>
    </ul>
    )

  }
]


//---------------------------------------------------------------------------------------------------------------------------------------------------

const AboutMeSection = () => {
  
    const [tab , setTab]= useState("skills");
    const [  isPending  , startTransition]=useTransition();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

  //for the transition when we click on skills , certification and education
  
const handleTabChange=(id)=>{
  startTransition(()=>{
    setTab(id);
  })
}

  return (

    // ABOUT ME
    <div className="text-white min-h-screen mt-10 " ref={ref}>
      <div className="md:grid md:grid-cols-[1fr_1.5fr] gap-12 items-center px-1 xl:gap-5 sm:py-6 py-5">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-start h-full mb-3 md:mb-0"
        >
        <Image
        src="/chair2.jpeg" width={400} height={250} alt="me"
        className="rounded-2xl object-cover"
        />
        </motion.div>
        <motion.div 
          className=" md:mt-0 text-left flex flex-col h-full "
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <h2  className="text-4xl font-bold bg-linear-to-r from-blue-400 to-black-600 bg-clip-text text-transparent mb-4">About Me</h2>
      <p className="text-base sm:p-0">I am a Electronics and Communicaton Engineering student at Dhanalakshmi Srinivasan Engineering College (DSEC), Perambalur, with strong foundations in Data Structures and Algorithms and hands-on experience in full-stack web development. I enjoy building scalable, user-focused applications using modern technologies.
</p>
<br/> <p>I have solved <span className="font-bold text-blue-400"> problems </span> on LeetCode, which has strengthened my problem-solving skills and ability to write efficient, maintainable code. I am a continuous learner and am actively seeking opportunities to contribute to real-world projects and grow as an engineer.
</p>
   
 {/* TAB Headings */}
 <div className="flex flex-row justify-start mt-8 ">
    <TabButton selectTab={()=> handleTabChange("skills")} active = {tab === "skills"}>{" "}Skills{" "}</TabButton>
    <TabButton selectTab={()=> handleTabChange("education")} active = {tab === "education"}>{" "}Education{" "}</TabButton>
   </div>

 {/* displaying the tab content */}
<div className="mt-8 min-h-80 transition-all duration-300">{TAB_DATA.find((t)=> t.id===tab).content}</div>




</motion.div>
      </div>
     
    </div>
  )
}

export default AboutMeSection
