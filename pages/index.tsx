import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import LoginModal from '../components/LoginModal'
import { Movie } from '../typings'

interface Props {
  trendingMovies : Movie[]
}

const Home: NextPage<Props> = ({trendingMovies} : Props) => {

  return (
    <div className="relative">
      <Head>
        <title>Cineview | Home of Motion Media</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className='relative'>
        <Hero trendingMovie={trendingMovies}/>
        <Feed trendingMovie={trendingMovies}/> 
      </main>
      
   
    </div>
  )
}

export default Home

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const getServerSideProps = async () => {
  const movies  = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => response.json())
  return  { props: { trendingMovies : movies.results,}}
}
