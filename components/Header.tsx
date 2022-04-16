import { Link, Input, Avatar } from "@nextui-org/react"
import { SearchIcon } from '@heroicons/react/outline'

const Header = () => {
  return (
    <header className=' z-50 fixed md:mt-4 left-0 right-0'>
        <div className="bg-white  flex items-center justify-between shadow-lg p-4 rounded-lg w-full transition-all md:max-w-7xl md:mx-auto">
           
            <div>

                <Link href='/' className="font-bold text-xl uppercase text-gray-800 transition-all hover:text-gray-600 ">CineView</Link>
            </div>
            <div className='hidden md:flex'>
                <Input shadow={false} size='md' width='420px' placeholder='Search...' contentRight={<SearchIcon/>}></Input>
            </div>
            <div className='flex space-x-4 items-center'>
              
                    <Link href='/playlist' className="font-bold text-sm uppercase text-gray-800 transition-all hover:text-gray-600 ">Playlist</Link>
                    <Link href='/playlist' className="font-bold text-sm uppercase text-gray-800 transition-all hover:text-gray-600 ">Login</Link>
               
                <Avatar squared text='Usr'/>
            </div>
         
        </div>
    </header>
  )
}

export default Header
