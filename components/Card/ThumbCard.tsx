import Image from 'next/image'
import React from 'react'
import { HiDotsVertical, HiPlay } from 'react-icons/hi'
import { Movie } from '../../typings'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useList } from '../../utils/List-context'
// import { Dropdown } from '@nextui-org/react'

interface Props {
  movie: Movie
}

const ThumbCard = ({ movie }: Props) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/'
  const router = useRouter()
  const { addtoHistory } = useList()
  const [show, setShow] = React.useState(false)

  const onClickHandler = (movie: Movie) => {
    const media = movie.name || movie.title || movie.original_name
    router.push({ pathname: `/${movie.id}`, query: { media } })
    addtoHistory(movie)
  }

  return (
    <motion.div className="flex flex-col">
      <div
        className={` aspect-h-6 aspect-w-10 cursor-pointer hover:grayscale `}
      >
        <div
          onClick={() => onClickHandler(movie)}
          className="inset-0 z-10 flex items-center justify-center rounded-xl text-brandwhite opacity-0 hover:opacity-100"
        >
          <HiPlay className="h-12 w-12" />
        </div>
        <Image
          priority
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout={'fill'}
          className="rounded-xl shadow-md"
        />
      </div>
      <div className="relative flex items-center justify-between p-2">
        <span>
          <h1 className="text-xl font-bold dark:text-brandwhite">
            {movie.title || movie.original_name}
          </h1>
          <p className="text-sm font-bold text-brandamber">
            {movie.vote_average}
          </p>
        </span>
        {/* <Dropdown>
          <Dropdown.trigger>
            <HiDotsVertical onClick={() => setShow(!show)} />
          </Dropdown.trigger>
          <Dropdown.menu>
            <Dropdown.item key="playlist">Add to playlist</Dropdown.item>
            <Dropdown.item key="liked">Like video</Dropdown.item>
          </Dropdown.menu>
        </Dropdown> */}
      </div>
    </motion.div>
  )
}

export default ThumbCard
