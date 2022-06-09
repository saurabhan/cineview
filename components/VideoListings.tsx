import { Movie } from "../typings"
import ThumbCard from "./Card/ThumbCard"
import MovieCard from "./MovieCard"

interface Props  {
    trendingMovie : Movie[]
}



const VideoListings = ({trendingMovie} : Props) => {
  return (
      <>
    <div className='mt-10'>
      <h1 className='text-4xl font-bold text-center'>Video Library</h1>
      <div className='grid grid-cols-1 p-4 gap-5 md:max-w-7xl md:mx-auto md:grid-cols-3'>

      {
          trendingMovie.map((movie) => (
              <ThumbCard key={movie.id} movie={movie} />
          ))
      }
      </div>
    </div>
    </>
  )
}

export default VideoListings
