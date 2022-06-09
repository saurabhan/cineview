import React from 'react'
import Feed from '../components/Feed/Feed'
import { Movie } from '../typings'
import { useList } from '../utils/List-context'

interface Props {
    movies: Movie[],
    topRated: Movie[],
    comedyMovies: Movie[],
    actionMovies: Movie[],
    horrorMovies: Movie[],
    romanceMovies: Movie[],
}

const explore = ( props: Props) => {

    const {movies, topRated, comedyMovies, actionMovies, horrorMovies, romanceMovies } = useList()
    const [active, setActive ] = React.useState(movies)
  
  return (
    <div className='flex flex-col justify-center mt-10'>
        <div className='flex gap-4 max-w-sm mx-auto md:max-w-xl overflow-x-scroll scrollbar-hide'>
            <button onClick={() => setActive(movies)} className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`}>Trending</button>
            <button onClick={() => setActive(topRated)} className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`} >Top Rated</button>
            <button  onClick={() => setActive(comedyMovies)} className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`} >Comedy</button>
            <button onClick={() => setActive(actionMovies)}  className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`} >Action</button>
            <button onClick={() => setActive(horrorMovies)} className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`} >Horror</button>
            <button  onClick={() => setActive(romanceMovies)} className={`p-1 pl-2 pr-2 font-bold rounded-full bg-brandamber`} >Romance</button>
        </div>

        {
            active.length==0 ? <Feed trendingMovie={movies} /> : <Feed trendingMovie={active} />
        }
        {/* <Feed trendingMovie={active}/> */}
    </div>
  )
}

export default explore
