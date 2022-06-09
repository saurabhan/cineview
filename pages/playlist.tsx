
import ThumbCard from "../components/Card/ThumbCard"
import { useAuth } from "../utils/AuthContext"
import { useList } from "../utils/List-context"

const playlist = () => {

     const { list } = useList()
     const { user} = useAuth()

  return (
      <div>
        <div className='pt-40'>
      <h1 className='text-4xl font-bold text-center'>Playlist</h1>
      {
        user ? 
      <div className='grid grid-cols-1 p-4 gap-5 md:max-w-7xl md:mx-auto md:grid-cols-3'>

      {
          list?.map((item) => (
              <ThumbCard key={item.id} movie={item} />
          ))
      }
      </div>
      :
      <div>
        <h1 className="text-center text-brandred">Please Login</h1>
      </div>
      }
    </div>
        
    </div>
  )
}

export default playlist
