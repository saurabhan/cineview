import React from 'react'
import { MdOutlineExplore, MdOutlineHistory } from 'react-icons/md'
import { HiCollection, HiUser, HiOutlineHome, HiThumbUp } from 'react-icons/hi'
import Link from 'next/link'
import LoginModal from '../LoginModal'

interface Props {}

const Navbar = (props: Props) => {
  const [active, setActive] = React.useState<string>('home')
  const [visible, setVisible] = React.useState(false)
  const handler = () => {
    setVisible(!visible)
  }

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <nav className="bg-white fixed bottom-0 z-10 flex w-full items-center justify-evenly bg-brandwhite p-2 shadow-lg dark:bg-blackgray  md:relative md:justify-between md:rounded-b-2xl ">
      <div>
        <h1 className="hidden text-xl font-bold uppercase text-brandamber md:block">
          Cineview
        </h1>
      </div>
      <div className="flex items-center justify-between space-x-4 font-semibold">
        <Link href="/" shallow={true}>
          <a
            className={`nav-icon ${
              active === 'home' ? 'bg-brandamber hover:text-black' : ''
            }`}
            onClick={() => setActive('home')}
            id="home"
          >
            <HiOutlineHome className="h-7 w-7" />
            <h2 className="hidden md:block">Home</h2>
          </a>
        </Link>
        <Link href="/explore" shallow={true}>
          <a
            className={`nav-icon ${
              active === 'explore' ? 'bg-brandamber hover:text-black' : ''
            }`}
            onClick={() => setActive('explore')}
            id="explore"
          >
            <MdOutlineExplore className="h-7 w-7" />
            <h2 className="hidden md:block">Explore</h2>
          </a>
        </Link>
        <Link href="/history" shallow={true}>
          <a
            className={`nav-icon ${
              active === 'history' ? 'bg-brandamber hover:text-black' : ''
            }`}
            onClick={() => setActive('history')}
            id="history"
          >
            <MdOutlineHistory className="h-7 w-7" />
            <h2 className="hidden md:block">History</h2>
          </a>
        </Link>
        <Link href="/playlist" shallow={true}>
          <a
            className={`nav-icon ${
              active === 'playlist' ? 'bg-brandamber hover:text-black' : ''
            }`}
            onClick={() => setActive('playlist')}
            id="playlist"
          >
            <HiCollection className="h-7 w-7" />
            <h2 className="hidden md:block">Playlist</h2>
          </a>
        </Link>
        <Link href="/liked" shallow={true}>
          <a
            className={`nav-icon ${
              active === 'liked' ? 'bg-brandamber hover:text-black' : ''
            }`}
            onClick={() => setActive('liked')}
            id="playlist"
          >
            <HiThumbUp className="h-7 w-7" />
            <h2 className="hidden md:block">Liked</h2>
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-4 font-semibold">
        <LoginModal />
      </div>
    </nav>
  )
}

export default Navbar
