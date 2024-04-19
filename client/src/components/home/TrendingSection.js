import ShowInPlaceHeader from '../ShowInPlaceHeader'
import TrendingContainer from './TrendingContainer'

export default function TrendingSection() {
  return (
    <div className='trending-section'>
      <ShowInPlaceHeader showtype={"Trending"} />
      <TrendingContainer />
    </div>
  )
}
