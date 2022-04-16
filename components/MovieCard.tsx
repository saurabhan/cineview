import { Movie, Trailer } from '../typings'
import { Button, Card, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import {
  CheckCircleIcon,
  PlusCircleIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline'

interface Props {
  movie: Movie
}

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const MovieCard = ({ movie }: Props) => {
  const [visible, setVisible] = useState(false)
  const closeHandler = () => setVisible(false)
  const [trailer, setTrailer] = useState('')
  const [like, setLike] = useState(false)
  const [addtolist, setAddtolist] = useState<string[]>([])


  function likeHandler() {
    console.log('added to playlist')
    setLike(!like)
  }

  function addToListHandler() {
      if(addtolist.includes(movie.id.toString())){
          console.log("already in list")
      }else{
          const newMovie = [...addtolist, movie.id.toString()]
          setAddtolist(newMovie)
          console.log(addtolist)
      }
  }
  console.log(addtolist)

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (trailers: Trailer) => trailers.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
    }

    fetchMovie()
  }, [movie])

  return (
    <div>
      <Card cover hoverable clickable onClick={() => setVisible(true)}>
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
      </Card>

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
              <Button auto className="text-black" onClick={addToListHandler}>
                {addtolist.includes(movie.id.toString()) ? (
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
