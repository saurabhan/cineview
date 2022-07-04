import { Input, Avatar } from '@nextui-org/react'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'

const Header = () => {
  return (
    <header className=" fixed left-0 right-0 z-50 md:mt-4">
      <div className="bg-white  flex w-full items-center justify-between rounded-lg p-4 shadow-lg transition-all md:mx-auto md:max-w-7xl">
        <div>
          <Link href="/">
            <span className="text-gray-800 hover:text-gray-600 cursor-pointer text-xl font-bold uppercase transition-all">
              CineView
            </span>
          </Link>
        </div>
        <div className="hidden md:flex">
          <Input
            shadow={false}
            size="md"
            width="420px"
            placeholder="Search..."
            contentRight={<SearchIcon />}
          ></Input>
        </div>
        <div className="flex items-center space-x-4">
          <Link shallow={true} href="/playlist">
            <span className="text-gray-800 hover:text-gray-600 cursor-pointer text-sm font-bold uppercase transition-all">
              Playlist
            </span>
          </Link>
          <Link shallow={true} href="/auth">
            <span className="text-gray-800 hover:text-gray-600 cursor-pointer text-sm font-bold uppercase transition-all">
              Login
            </span>
          </Link>

          <Avatar squared text="Usr" />
        </div>
      </div>
    </header>
  )
}

export default Header
