import { Movie, Trailer } from "../typings"
import { Card, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from "react"
import ReactPlayer from "react-player/lazy"

interface Props {
    movie : Movie
}

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const MovieCard = ({movie} : Props) => {
    const [visible, setVisible] = useState(false);
    const closeHandler = () => setVisible(false);
    const [trailer, setTrailer] = useState('')


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
        console.log(movie)
      }, [movie])

  return (
    <div>
      <Card cover hoverable clickable  onClick={() => setVisible(true)}>
        <Card.Image
               src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
               height={240}
               width="100%"
               alt="Card image background"
             />
        <Card.Header css={{ position: "absolute", zIndex: 1, bottom: 5, }}>
            <Text className='text-white font-bold text-2xl'>{movie.name || movie.title}</Text>
        </Card.Header>
      </Card>

      <div >
          
      <Modal width='720px' closeButton blur open={visible} onClose={closeHandler} >
            <Modal.Header>
                <Text>{movie?.name || movie?.title}</Text>
            </Modal.Header>
            <Modal.Body css={{width: '100%', height: '30rem'}}>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            />
            </Modal.Body>
            
        </Modal>
        </div>  
    </div>
  )
}

export default MovieCard
