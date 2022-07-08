import ThumbCard from '../components/Card/ThumbCard'
import { Movie } from '../typings'
import { useAuth } from '../utils/AuthContext'
import { useList } from '../utils/List-context'

const playlist = () => {
  const { playlist } = useList()
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      <div className="pt-4">
        <h1 className="text-center text-4xl font-bold">Playlist</h1>
        {user ? (
          <div>
            {playlist &&
              Object.keys(playlist).map((item) => (
                <>
                  <div className="mx-auto p-4 md:max-w-7xl">
                    <h1 className="text-2xl">{item}</h1>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 gap-5 p-4 md:mx-auto md:max-w-7xl md:grid-cols-3">
                    {(playlist[item as keyof typeof playlist] as any).map(
                      (item: Movie) => (
                          <ThumbCard key={item.id} movie={item} />
                          )
                    )}
                          </div>
                  </div>
                </>
              ))}
          </div>
        ) : (
          <div>
            <h1 className="text-center text-brandred">Please Login</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default playlist
