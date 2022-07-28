import React, { useState } from 'react'
import useFetch from '../hook/useFetch.js'
import allmovie from './allmovie.css'
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'
import axios from 'axios';
import notfound from '../img/Search-rafiki.png'
const AllMovies = (item) => {

    const {data,loading,error,reFetch}=useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=5d8fac4c34a59483590d6086fdb82125&language=en-US&page=1`);
   
   const [homeflag,setHomeFlag] = useState(true);
    const PER_PAGE=9;
    const [currentPage,setCurrentPage]=React.useState(0);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [movie,setMovie]=useState([]);
   
    const handlePageClick=({selected:selectedPage})=>{
       console.log("selectedPage",selectedPage);
       setCurrentPage(selectedPage);
    }
 
       const searchMovies = async (e) => {
          setHomeFlag(false);
          e.preventDefault();
          const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${search}&page=1&include_adult=false`;
         await axios.get(url)
         .then((response)=>{
            console.log(response);
            const data=response.data.results;
            console.log(data,"getting value");
            setMovie(data);
            setFilteredData(data);
         }).catch((error)=>{
            console.log(error);
         })
      }
      const searchFilterFunction = (text) => {
        if (text) {
             let val = text.target.value;
            console.log(text.target.value);
            setSearch(val);
          } else {
             setFilteredData(movie);
             setSearch(text);
          }
        };
  
 
  
    const offset=currentPage*PER_PAGE;
   const pageCount=Math.ceil(data.length/PER_PAGE);
   const currentPageData=data.slice(offset,offset+PER_PAGE);
  
  const HomePage=()=>{
   return(
    <>
      {currentPageData.map((item,index)=>
        <div className='card' key={index}>
               <Link to="/SingleMovie" state={{item:item }}>
                <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.path}/>
                </Link>
                <div className="title">
                <h4>{item.title}</h4>
                <span>⭐{item.popularity}</span>
                </div>
           </div>
           )}
       </>
  )}
const Search=()=>{
   return (
      <>
    {filteredData.map((item,index)=>(
        <div className='card' key={index}>
            <Link to="/SingleMovie" state={{item:item }}>
             <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.path}/>
             </Link>
             <div className="title">
             <h4>{item.title}</h4>
             <span>⭐{item.popularity}</span>
             </div>
        </div>
        ))} 
     </>
   )
}

const NotFound=()=>{
   return(
      <div className='image_tag'>
         <img src={notfound} alt=""/>
         <h2 style={{textAlign:'center',marginLeft:'16em'}}>Oops...No found data</h2>
      </div>
   )
}

 return (
    <>
   <div className='container'>
      <div className='search_section'>
         <input type="text" placeholder='search movies'
          className="input"
          onChange={(text) => searchFilterFunction(text)}
           value={search}
          />
         <button className='btns' onClick={searchMovies} ><SearchIcon style={{marginTop:'3px'}}/></button>
      </div>
    <div className='product_wrapper'>
         <div className='product_title'>
                <h2 className='title_wrapper'>Trending</h2>
           </div>
        </div>
     <div>
      <div className='productsWrapper'>
      {homeflag ==true ? <HomePage/>:<Search/>}
      
       </div>
       <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination_link"}
        nextLinkClassName={"pagination_link"}
        disabledClassName={"pagination_link_disabled"}
        activeClassName={"pagination_link_active"}
        />
         </div>
      </div>
        </>
        
  )
}


export default AllMovies