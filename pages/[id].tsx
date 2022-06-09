import { CheckCircleIcon, PlusCircleIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactPlayer from 'react-player'
import { Movie } from '../typings'
import { useAuth } from '../utils/AuthContext'
import { useList } from '../utils/List-context'

interface Props {}

const MovieListing = (props: Props) => {
  const { addtolist, trailer, fetchMoviebyId, list } = useList()
  const [movie, setMovie] = React.useState<Movie>()
  const [like, setLike ] =  React.useState(false)
  const { user }  = useAuth()
  const router = useRouter()
  const { id, media } = router.query
  const movieID = +id!
  const MediaID = media!

  function likeHandler() {
    setLike(!like)
  }

  const clickHAndler = () => {
    if (user) {
      addtolist(movie!)
    } else {
      toast.error('Please login to add to list', {
        duration: 3000,
        position: 'bottom-center',
        }) 
      }}

  const movieHandler = async () => {
    const movie = await fetchMoviebyId(movieID, MediaID as string)
    setMovie(movie)
  }

  useEffect(() => {
    movieHandler()
  }, [])

  return (
    <div className="p-10">
      <Toaster/>
    
        <h1 className="text-3xl mt-2 mb-2 font-bold">{movie?.title || movie?.name}</h1>
      
      <div className='flex flex-col md:flex-row gap-5'>

      <div className="w-full h-56 md:w-[50vw] aspect-w-6 aspect-h-2 md:flex-row bg-brandamber     ">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          playing
          controls
          />
      </div>
      <div className='flex-1'>
        <p className="text-xl font-italic">{movie?.overview}</p>
        <span className='flex items-center gap-2'>
        Release Date: 
        <p className="text-xl font-bold text-brandamber">{movie?.first_air_date || movie?.release_date}</p>
        </span>
        <p className="text-xl font-bold text-brandamber">{movie?.vote_average}</p>
        <div className='flex gap-10 pt-10'>
            <button className="text-black" onClick={likeHandler}>
                {like ? (
                  <ThumbUpIcon className="h-7 w-7" fill="true" />
                ) : (
                  <ThumbUpIcon className="h-7 w-7" />
                )}
              </button>
              <button  className="text-black" onClick={() => clickHAndler()}>
                {list.find((m: Movie) => m.id === movie?.id) ? (
                  <CheckCircleIcon className="h-7 w-7" />
                ) : (
                  <PlusCircleIcon className="h-7 w-7" />
                )}
              </button>
        </div>
      </div>
      </div>
      <div>
      </div>
     
    </div>
  )
}

export default MovieListing
