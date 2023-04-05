import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// import Flvplayer from '../../components/FlvPlayer'
// import ReactPlayer from 'react-player';
// import { ReactFlvPlayer } from 'react-flv-player'

// import { Input } from 'postcss'
const Flvplayer = dynamic(() => import('../../components/FlvPlayer'), {
    ssr: false
})

function LiveStream() {
  const [streamUrl, setStreamUrl] = useState("http://192.168.2.45:8000/live/rQK9flnZY.flv");
    const handleChange = (e) => {
        setStreamUrl(e.target.value);
  }
  // https://14ef-157-42-240-31.in.ngrok.io/live/rQK9flnZY.flv/live/rQK9flnZY.flv
  return (
    <div className="relative w-fit h-[30rem] m-2 p-2 ">
      <Flvplayer
        url={streamUrl}//"http://localhost:8000/live/rQK9flnZY.flv"
        //{`/${record.app}/${record.name}.flv${sign}`}
        className="w-full h-full"
        type="flv"
      />
      <div className="absolute top-6 right-6 flex items-center">
        <div className="w-3 h-3 bg-red-600 rounded-lg mx-2" /> live
      </div>
      <input
        type="text"
        value={streamUrl}
        className="text-black p-2"
        onChange={handleChange} />
    </div>
  )
}

export default LiveStream