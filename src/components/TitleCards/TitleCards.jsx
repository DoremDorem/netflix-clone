import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data"
import {Link} from "react-router-dom";
const TitleCards = ({title,cateogry}) => {
    const [apiData,setApiData]=useState([]);
    const cardsRef=useRef();


    //fetch movie data from TMDB database
            const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDBhODI4YmU4Y2Y1YzgzMGFhNjIxZjQwNzA0MTkyMiIsIm5iZiI6MTc1NjM5OTYyNy42MDksInN1YiI6IjY4YjA4ODBiOGU0ZjczMGFlZDVlZDZmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.89N6O_YMRjoy67CZDTFWp9qJgXe5mfPncGSKdTWIofM'
        }
        };

       useEffect(()=>{
         fetch(`https://api.themoviedb.org/3/movie/${cateogry?cateogry:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
       },[])

    const handleWheel=(event)=>{
        event.preventDefault;
        cardsRef.current.scrollLeft+=event.deltaY;
    }
    useEffect(()=>{
        cardsRef.current.addEventListener('wheel',handleWheel);
    },[])
  return (
    <div className='title-cards'>
        <h2>{title?title:'Popular on Netflix'}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}
        </div>
    </div>
  )
}

export default TitleCards
