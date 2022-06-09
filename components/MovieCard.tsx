
import { Movie, Trailer } from '../typings'
import { Button, Card, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  PlusCircleIcon,
  ThumbUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useList } from '../utils/List-context'
import Image from 'next/image'
import { HiDotsVertical, HiPlay } from 'react-icons/hi'

interface Props {
  movie: Movie
}

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const MovieCard = ({ movie }: Props) => {
  const [visible, setVisible] = useState(false)
  const closeHandler = () => setVisible(false)
  const [like, setLike] = useState(false)
  const {list, addtolist, fetchTrailer, trailer, addtoHistory} = useList()
  function likeHandler() {
    setLike(!like)
  }
  
  function onClickHandler(movie: Movie){
    setVisible(true)
    addtoHistory(movie)
    fetchTrailer(movie)
  }


  return (
    <div>
      {/* <Card cover hoverable clickable onClick={() => onClickHandler(movie)}>
        <Card.Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          height={240}
          width="100%"
          alt="Card image background"
        />
        <Card.Header css={{ position: 'absolute', zIndex: 1, bottom: 5 }}>
          <Text className="text-2xl font-bold text-white">
            {movie.name || movie.title}
          </Text>
        </Card.Header>
      </Card> */}

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

      <div>
        <Modal
          width="720px"
          closeButton
          blur
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text className="text-xl font-bold text-black">
              {movie?.name || movie?.title}
            </Text>
          </Modal.Header>
          <Modal.Body autoMargin css={{ width: '100%', height: '40rem' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="flex flex-1 space-x-4">
              <Button auto className="text-black" onClick={likeHandler}>
                {like ? (
                  <ThumbUpIcon className="h-7 w-7" fill="true" />
                ) : (
                  <ThumbUpIcon className="h-7 w-7" />
                )}
              </Button>
              <Button auto className="text-black" onClick={() => addtolist(movie)}>
                {list?.includes(movie) ? (
                  <CheckCircleIcon className="h-7 w-7" />
                ) : (
                  <PlusCircleIcon className="h-7 w-7" />
                )}
              </Button>
            </div>
            <div className='flex space-x-7 items-center'>
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-normal">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div>
                <span className="text-gray-500 font-bold">Total votes:</span>{' '}
                {movie?.vote_count}
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default MovieCard
