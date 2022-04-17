import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import { useList } from "../utils/List-context"

const playlist = () => {

     const { list } = useList()

  return (
      <div>
        <Header/>
        <div className='pt-40'>
      <h1 className='text-4xl font-bold ml-10'>Playlist</h1>
      <div className='grid grid-cols-1 p-4 gap-5 md:max-w-7xl md:mx-auto md:grid-cols-3'>

      {
          list?.map((item) => (
              <MovieCard key={item.id} movie={item} />
          ))
      }
      </div>
    </div>
        
    </div>
  )
}

export default playlist
