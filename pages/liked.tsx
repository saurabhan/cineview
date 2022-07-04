import React from 'react'
import ThumbCard from '../components/Card/ThumbCard'
import Feed from '../components/Feed/Feed'
import { useAuth } from '../utils/AuthContext'
import { useList } from '../utils/List-context'

interface Props {}

const liked = (props: Props) => {
  const { liked } = useList()
  const { user } = useAuth()
  return (
    <div className="h-screen">
      <div className="m-10">
        <h1 className="text-center text-2xl font-bold ">liked Movies</h1>
      </div>
      {user ? (
        <div className="grid grid-cols-1 gap-5 p-4 md:mx-auto md:max-w-7xl md:grid-cols-3">
          {liked?.map((item) => (
            <ThumbCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-brandred">Please Login</h1>
        </div>
      )}
    </div>
  )
}

export default liked
