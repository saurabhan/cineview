import React from 'react'
import { MdOutlineExplore, MdOutlineHistory } from 'react-icons/md'
import { HiCollection, HiUser, HiOutlineHome } from 'react-icons/hi'
import Link from 'next/link'
import LoginModal from '../LoginModal'

interface Props {}

const Navbar = (props: Props) => {
    const [active, setActive] = React.useState<string>("home")
    const [visible, setVisible] = React.useState(false)
  const handler = () => {
    setVisible(!visible)
  }

  const closeHandler = () => {
    setVisible(false)
  }


  return ( 
    <nav className='flex z-10 items-center bg-brandwhite bottom-0 fixed w-full md:relative justify-evenly md:justify-between p-2 shadow-lg  md:rounded-b-2xl bg-white dark:bg-blackgray '>
        <div>
            <h1 className='hidden md:block font-bold uppercase text-xl text-brandamber'>Cineview</h1>
        </div>
        <div className='flex space-x-4 font-semibold items-center justify-between'>
            <Link href="/" shallow={true}>
            <a
            className={`nav-icon ${active === 'home' ? "bg-brandamber hover:text-black" : ""}`}
            onClick={() => setActive('home')}
            id='home'
            >
            <HiOutlineHome className='h-7 w-7'/>
            <h2 className="hidden md:block">Home</h2>
            </a >
            </Link>
            <Link href='/explore' shallow={true}>
            <a  className={`nav-icon ${active === 'explore' ? "bg-brandamber hover:text-black" : ""}`}
            onClick={() => setActive('explore')}
            id='explore'>
            <MdOutlineExplore className='h-7 w-7'/>
            <h2 className="hidden md:block">Explore</h2>
            </a>
            </Link>
            <Link href='/history' shallow={true}>
            <a className={`nav-icon ${active === 'history' ? "bg-brandamber hover:text-black" : ""}`}
            onClick={() => setActive("history")}
            id='history'>
            <MdOutlineHistory className='h-7 w-7'/>
            <h2 className="hidden md:block">History</h2>
            </a>
            </Link>
            <Link href="/playlist" shallow={true}>
            <a  className={`nav-icon ${active === 'playlist' ? "bg-brandamber hover:text-black" : ""}`}
            onClick={() => setActive("playlist")}
            id='playlist'>
            <HiCollection className='h-7 w-7'/>
            <h2 className="hidden md:block">Playlist</h2>
            </a>
            </Link>
        </div>
        <div className='flex font-semibold items-center space-x-4'>
        
        <LoginModal/>
         
        </div>
    </nav>
  )
}

export default Navbar