import {
  CheckCircleIcon,
  PlusCircleIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactPlayer from 'react-player'
import Feed from '../components/Feed/Feed'
import PlaylistModal from '../components/PlaylistModal'
import { Movie } from '../typings'
import { useAuth } from '../utils/AuthContext'
import { useList } from '../utils/List-context'

interface Props {}

const MovieListing = (props: Props) => {
  const { addtoLiked, liked, trailer, fetchMoviebyId, topRated } = useList()
  const [movie, setMovie] = React.useState<Movie>()
  const { user } = useAuth()
  const router = useRouter()
  const { id, media } = router.query
  const movieID = +id!
  const MediaID = media!

  function likeHandler() {
    if (user) {
      addtoLiked(movie!)
    } else {
      toast.error('Please login to add to list', {
        duration: 3000,
        position: 'bottom-center',
      })
    }
  }

  const movieHandler = async () => {
    const movie = await fetchMoviebyId(movieID, MediaID as string)
    setMovie(movie)
  }

  useEffect(() => {
    movieHandler()
  }, [movieID])

  return (
    <div className="p-5 md:p-10">
      <Toaster />

      <h1 className="mt-2 mb-2 text-3xl font-bold">
        {movie?.title || movie?.name}
      </h1>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="aspect-w-6 aspect-h-2 h-56 w-full bg-brandamber md:w-[50vw] md:flex-row     ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            playing
            controls
          />
        </div>
        <div className="flex-1">
          <p className="font-italic text-xl">{movie?.overview}</p>
          <span className="flex items-center gap-2">
            Release Date:
            <p className="text-xl font-bold text-brandamber">
              {movie?.first_air_date || movie?.release_date}
            </p>
          </span>
          <p className="text-xl font-bold text-brandamber">
            {movie?.vote_average}
          </p>
          <div className="flex gap-10 pt-10">
            <button className="text-black" onClick={() => likeHandler()}>
              {liked.find((m: Movie) => m.id === movie?.id) ? (
                <ThumbUpIcon className="h-7 w-7" fill="true" />
              ) : (
                <ThumbUpIcon className="h-7 w-7" />
              )}
            </button>
            <PlaylistModal movie={movie!} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="pt-7 text-center text-2xl font-bold">More Media </h1>
        <Feed trendingMovie={topRated} />
      </div>
    </div>
  )
}

export default MovieListing
