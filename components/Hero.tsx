import { Movie } from '../typings'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  trendingMovie: Movie[]
}

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const Hero = ({ trendingMovie }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(trendingMovie[Math.floor(Math.random() * trendingMovie.length)])
  }, [trendingMovie])

  return (
    <div className="flex h-[45vh] flex-col space-y-2 py-16 text-brandwhite md:space-y-4 lg:h-[85vh] lg:justify-end lg:pb-12">
      <div className="absolute inset-0 h-[45vh] w-screen lg:h-[85vh]">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="z-20 pt-52 text-center">
        <h1 className=" text-white text-2xl font-bold md:text-4xl lg:text-7xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>
    </div>
  )
}

export default Hero
