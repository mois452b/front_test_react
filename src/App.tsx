
import { ImageInfo } from './components/ImageInfo'
import { MarvelMoviesSeries } from './components/MarvelMoviesSeries'
import { Weather } from './components/weather'

function App() {

  return (
    <div className='flex flex-row gap-4 px-4 w-screen items-center justify-between border border-red-500 bg-slate-400 h-screen'>
      <span className='w-1/3 bg-white h-1/3 flex rounded-lg items-center justify-center'>
        <ImageInfo />
      </span>
      <span className='w-1/3 bg-white h-1/3 flex rounded-lg items-center justify-center'>
        <MarvelMoviesSeries />
      </span>
      <span className='w-1/3 bg-white h-1/3 flex rounded-lg items-center justify-center'>
        <Weather />
      </span>
    </div>
  )
}

export default App
