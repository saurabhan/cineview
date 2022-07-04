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
    <div className="flex flex-col text-brandwhite space-y-2 py-16 h-[45vh] md:space-y-4 lg:h-[85vh] lg:justify-end lg:pb-12">
      <div className="absolute inset-0 h-[45vh] lg:h-[85vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="z-20 text-center pt-52">
        <h1 className=" text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>
    </div>
  )
}

export default Hero
