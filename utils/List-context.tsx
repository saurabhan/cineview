import { useState, useEffect, useContext, createContext } from 'react'
import { Movie, Trailer } from '../typings'

interface IListContext {
  movies: Movie[]
  topRated: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  actionMovies: Movie[]
  romanceMovies: Movie[]
  list: Movie[]
  history: Movie[]
  addtoHistory: (movie: Movie) => void
  addtolist: (movie: Movie) => void
  fetchMoviebyId: (id: Number, media: string) => Promise<any>
  fetchTrailer: (movie: Movie) => Promise<void>
  trailer: string
}

const ListContext = createContext<IListContext>({
  movies: [],
  topRated: [],
  comedyMovies: [],
  horrorMovies: [],
  actionMovies: [],
  romanceMovies: [],
  list: [],
  history: [],
  addtoHistory: () => {},
  addtolist: () => {},
  fetchMoviebyId: async () => {},
  fetchTrailer: async () => {},
  trailer: '',
})

const useList = () => useContext(ListContext)

const ListProvider = ({ children }: any) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const BASE_URL = 'https://api.themoviedb.org/3'
  const [list, setList] = useState<Movie[]>([])
  const [trailer, setTrailer] = useState('')
  const [history, setHistory] = useState<Movie[]>([])
  const [movies, setMovies] = useState<Movie[] | []>([])
  const [topRated, settopRated] = useState<Movie[] | []>([])
  const [comedyMovies, setcomedyMovies] = useState<Movie[] | []>([])
  const [horrorMovies, sethorrorMovies] = useState<Movie[] | []>([])
  const [actionMovies, setactionMovies] = useState<Movie[] | []>([])
  const [romanceMovies, setromanceMovies] = useState<Movie[] | []>([])

  const fetchMovie = async () => {
    const m = await fetch(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
    ).then((response) => response.json())
    setMovies(m.results)
  }

  const fetchMovies = async () => {
    const [
      trendingMovies,
      topRated,
      comedyMovies,
      actionMovies,
      horrorMovies,
      romanceMovies,
    ] = await Promise.all([
      fetch(
        `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
      ).then((response) => response.json()),
      fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ).then((response) => response.json()),
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35&page=1`
      ).then((response) => response.json()),
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28&page=1`
      ).then((response) => response.json()),
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=27&page=1`
      ).then((response) => response.json()),
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10749&page=1`
      ).then((response) => response.json()),
    ])
    settopRated(topRated.results)
    setcomedyMovies(comedyMovies.results)
    sethorrorMovies(horrorMovies.results)
    setactionMovies(actionMovies.results)
    setromanceMovies(romanceMovies.results)
    
  }

  const fetchTrailer = async (movie: Movie) => {
    const movieID =  movie?.id
    const media_type = movie?.media_type === 'movie' ? 'movie' : 'tv'
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        media_type
      }/${movieID}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err.message))

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (trailers: Trailer) => trailers.type === 'Trailer'
      )
      setTrailer(data.videos?.results[index]?.key)
    }
  }

  const fetchMoviebyId = async (id: Number, media: string) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${media}&page=1&include_adult=true`
    ).then((response) => response.json())
    const result = data.results.find(
      (movie: Movie) => movie.id === id 
    )
    fetchTrailer(result)
    return result
      
  }

  const addtolist = (movie: Movie) => {
    const r = list.find((m: Movie) => m.id === movie.id)
    if (r) {
      const l = list.filter((item) => item.id !== movie.id)
      setList(l)
    } else {
      setList([...list, movie])
    }
  }



  const addtoHistory = ( movie: Movie) => {
    if (history?.includes(movie)) {
      const l = history.filter((item) => item !== movie)
      setHistory(l)
    } else {
      setHistory([...history, movie])
    }
  }

  useEffect(() => {
    fetchMovie()
    fetchMovies()
  }, [])

  return (
    <ListContext.Provider
      value={{
        addtolist,
        list,
        movies,
        topRated,
        comedyMovies,
        horrorMovies,
        actionMovies,
        romanceMovies,
        addtoHistory,
        history,
        fetchTrailer,
        fetchMoviebyId,
        trailer,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export { ListProvider, useList }
