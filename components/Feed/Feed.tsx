import React from 'react'
import { Movie } from '../../typings'
import ThumbCard from '../Card/ThumbCard'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  trendingMovie: Movie[]
}

const gridVariant = {
    hidden : {opacity: 0},
    show: {opacity: 1,
    transition: {
        staggerChildren: 0.1,
        duration : 0.5,
        easing: 'easeInOut'
    }},
    exit : {opacity:0}
}


const ThumbVariant = {
    hidden : {opacity: 0,},
    show: {opacity: 1,
    transition: {
        staggerChildren: 0.1,
        duration : 0.5,
        easing: 'easeInOut'
    }},
    exit : {opacity: 0}
}

const Feed = ({ trendingMovie }: Props) => {
  return (
      <AnimatePresence exitBeforeEnter>

    <motion.div className="container m-7 mx-auto mb-12 p-4 ">
      <motion.div 
      variants={gridVariant}
        initial="hidden"
        animate="show"
        exit="exit"

      className="grid grid-cols-1 gap-8 md:grid-cols-4 ">
    
          {trendingMovie.map((movie) => (
              <motion.div key={movie.id} variants={ThumbVariant}>

                  <ThumbCard key={movie.id} movie={movie} />
              </motion.div>
          ))}
       
      </motion.div>
    </motion.div>
      </AnimatePresence>
  )
}

export default Feed
