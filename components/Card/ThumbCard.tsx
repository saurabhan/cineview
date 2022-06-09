import Image from 'next/image'
import React from 'react'
import { HiDotsVertical, HiPlay } from 'react-icons/hi'
import { Movie } from '../../typings'
import { motion} from 'framer-motion'
import {  useRouter } from 'next/router'
import { useList } from '../../utils/List-context'

interface Props {
    movie : Movie
}


const ThumbCard = ({movie}: Props) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/'
  const router = useRouter()
  const { addtoHistory } = useList()

  const onClickHandler = (movie: Movie) => {
    const media = movie.name || movie.title || movie.original_name
    router.push({pathname:`/${movie.id}`, query: {media}})
    addtoHistory(movie)
  }

  return (
    <motion.div  className="flex flex-col"
      onClick={() => onClickHandler(movie)}
    >
      <div className={`relative aspect-h-6 aspect-w-10 hover:grayscale cursor-pointer `}>
      <div className='inset-0 rounded-xl opacity-0 text-brandwhite flex items-center justify-center z-10 hover:opacity-100'><HiPlay className='h-12 w-12'/>
       
      </div>
        <Image
          priority
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout={'fill'}
          className="rounded-xl shadow-md"
        />
      </div>
      <div className='p-2 flex justify-between items-center'>
          <span>
        <h1 className="font-bold text-xl dark:text-brandwhite">{movie.title || movie.original_name}</h1>
        <p className="font-bold text-sm text-brandamber">{movie.vote_average}</p>

          </span>
        <HiDotsVertical/>
      </div>
    </motion.div>
  )
}

export default ThumbCard
