import React from 'react'
import { useLocation } from 'react-router-dom'
import singleMovie from './singleMovie.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';
const SingleMovie = () => {
  const location = useLocation()
  const {item } = location.state
  console.log(item);
  return (
    <div className='container_wrapper'>
       
      <div className='wrapper'>
     <Link to="/"><KeyboardBackspaceIcon className="icon"/></Link> 
       <div className='left'>
        <h1 className='text_title'>{item.original_title}</h1>
        <div className='rating'>
           <span >Rating: {item.popularity}</span>
        </div>
       <div className='paragraph'>
           <p>{item.overview}</p>
        </div>
        <div className='release'>
            <span>Relase date :{item.release_date}</span>
        </div>
        <p className='language'>original language:{item.original_language}</p>
       </div>
       <div className='right'>
        <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.path}/>
       </div>
      </div>
    </div>
  )
}

export default SingleMovie