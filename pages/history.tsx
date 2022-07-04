import { Button } from '@nextui-org/react'
import React from 'react'
import Feed from '../components/Feed/Feed'
import { useList } from '../utils/List-context'

interface Props {}

const history = (props: Props) => {
  const { history, clearHistory } = useList()
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-5">
        <div className="m-10">
          <h1 className="text-center font-bold ">Watch History</h1>
        </div>
        <Button auto className="bg-brandamber shadow-sm" onClick={clearHistory}>
          Clear History
        </Button>
      </div>
      <Feed trendingMovie={history} />
    </div>
  )
}

export default history
