import React from 'react'
import Feed from '../components/Feed/Feed'
import { useList } from '../utils/List-context'

interface Props {}

const history = (props: Props) => {
    const {history} = useList()
  return (
    <div >
        <div className='m-10' ><h1 className='text-center font-bold '>Watch History</h1></div>
        <Feed trendingMovie={history}/>

    </div>
  )
}

export default history