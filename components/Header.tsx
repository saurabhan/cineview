import { Input, Avatar } from "@nextui-org/react"
import  Link  from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'

const Header = () => {
  return (
    <header className=' z-50 fixed md:mt-4 left-0 right-0'>
        <div className="bg-white  flex items-center justify-between shadow-lg p-4 rounded-lg w-full transition-all md:max-w-7xl md:mx-auto">
           
            <div>

                <Link href='/' ><span className="font-bold text-xl uppercase text-gray-800 transition-all hover:text-gray-600 cursor-pointer">CineView</span></Link>
            </div>
            <div className='hidden md:flex'>
                <Input shadow={false} size='md' width='420px' placeholder='Search...' contentRight={<SearchIcon/>}></Input>
            </div>
            <div className='flex space-x-4 items-center'>
              
                    <Link shallow={true} href='/playlist' ><span className="font-bold text-sm uppercase text-gray-800 transition-all hover:text-gray-600 cursor-pointer">Playlist</span></Link>
                    <Link shallow={true} href='/playlist' ><span className="font-bold text-sm uppercase text-gray-800 transition-all hover:text-gray-600 cursor-pointer">Login</span></Link>
               
                <Avatar squared text='Usr'/>
            </div>
         
        </div>
    </header>
  )
}

export default Header
