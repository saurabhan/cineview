import { useState, useEffect, useContext, createContext } from 'react'
import { Movie, Trailer } from '../typings'

interface IListContext {
  movies: Movie[],
  list: Movie[],
  addtolist: (movie: Movie) => void,
  fetchTrailer: (movie: Movie) => Promise<void>,
  trailer: string,

}


const ListContext = createContext<IListContext>({
  movies:[],
  list:[],
  addtolist : ()=>{},
  fetchTrailer : async ()=>{},
  trailer:''
})

const useList = () => useContext(ListContext)

const ListProvider = ({ children }: any) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const BASE_URL = 'https://api.themoviedb.org/3'
  const [list, setList] = useState<Movie[]>([])
  const [trailer, setTrailer] = useState('')

  const [movies, setMovies] = useState<Movie[] | []>([])

  const fetchMovie = async () => {
    const m = await fetch(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
    ).then((response) => response.json())
    setMovies(m)
  }

  const fetchTrailer = async (movie : Movie) => {
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

  
  const addtolist = (movie : Movie) => {
    if(list?.includes(movie)){
      const l = list.filter(item => item !== movie)
      setList(l)
    }else{
      setList([...list, movie])
    }
  }
  
  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <ListContext.Provider value={{
      addtolist,
      list,
      movies,
      fetchTrailer,
      trailer
    }}>{children}</ListContext.Provider>
  )
}

export { ListProvider, useList }
