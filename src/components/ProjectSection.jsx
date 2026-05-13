"use client"
import React, { useRef } from 'react'
import ProjectCard from './ProjectCard'
import { motion, useInView } from 'framer-motion'


//data for the project cards
const projectsData=[

  {
  id: 1,
  title: "Tic-Tac-Toe",
  description: "Designed a responsive and user-friendly interface of tic-tac-toe game while strengthening problem-solving and DOM manipulation skills.",
  image: "/tic-tac-toe.png",
  url:"https://github.com/VIGNESH-T2005/Tic-Tac-Toe",
  liveurl:"https://tic-tac-toe-in-site.netlify.app/"
},
{
  id: 2,
  title: "Shop Zone",
  description: "Developed a basic e-commerce website named Shop Zone with product listings, shopping cart functionality, and responsive user interface design.",
  image: "/shop_zone.png",
  url:"https://github.com/VIGNESH-T2005/Responsive-landing-page-shop-zone-.git",
  liveurl:"https://shopzone-ecommerce.netlify.app/"
},
{
  id: 3,
  title: "Stop Watch",
  description: "A simple stop watch application with start, stop, and reset functionality.",
  image: "/stop_watch.png",
  url:"https://github.com/VIGNESH-T2005/Stop-Watch.git",
  liveurl:"https://stop-watch-app-sw.netlify.app/"
},
{
  id: 4,
  title: "To-Do List",
  description: "A simple and intuitive to-do list application with task management and organization features.",
  image: "/to_do_list.png",
  url:"https://github.com/VIGNESH-T2005/To-Do-List.git",
  liveurl:"https://to-do-list-site.netlify.app/"
},
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
