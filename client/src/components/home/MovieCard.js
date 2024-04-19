import { useNavigate } from 'react-router-dom'

export default function MovieCard({ showId, movieData }) {

  const navigate = useNavigate()

  function handleClick() {
    navigate(`/show-details/${showId}`)
  }

  return (
    <div className='movie-card' onClick={handleClick}>
      <div className='movie-card-image'><img alt='movie-poster' src={movieData.poster}/></div>
      <div className='movie-card-details'>
        <div>{movieData.name}</div>
        <div>{movieData.rating} /10</div>
      </div>
      {/* <img alt='movie img' src={movieData.poster} /> */}
      </div>
  )
}
