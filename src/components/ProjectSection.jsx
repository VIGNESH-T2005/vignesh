"use client"
import React, { useRef } from 'react'
import ProjectCard from './ProjectCard'
import { motion, useInView } from 'framer-motion'


//data for the project cards
const projectsData=[
  {
  id: 1,
  title: "HRC TECH",
  description: "HRC TECH is a e-learning platform that provides a wide range of courses and resources for learners to enhance their skills and knowledge in various domains.",
  image: "/hrc-tech.png",
  url:"https://github.com/VIGNESH-T2005/hrc-tech",
  liveurl:"https://hrctech.onrender.com/"
},
  {
  id: 2,
  title: "Shop Zone",
  description: "Developed a basic e-commerce website named Shop Zone with product listings, shopping cart functionality, and responsive user interface design.",
  image: "/shop_zone.png",
  url:"https://github.com/VIGNESH-T2005/shop_zone",
  liveurl:"https://shop-zone-ecomm.vercel.app/"
}
]

const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
        <motion.div 
          className="text-center text-4xl font-bold mt-4 mb-8 md:mb-12 bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            {projectsData.map((project, index)=> (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard title={project.title} description={project.description} imgUrl={project.image} url={project.url} liveurl={project.liveurl} />
              </motion.div>
            ))}
        </motion.div>
      
    </div>
  )
}

export default ProjectSection
