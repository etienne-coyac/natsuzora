import React from 'react'
import { Link } from "react-router-dom";

const AnimeCard = (props) => {
    const anime = props.anime;


    return (
        <div className='card row col-sm-4'>

            <Link to={`/anime/${anime.uuid}`}>
                <img className='col-sm-6' src={anime.image_url} alt="" />
                <h3>{anime.title}</h3>
            </Link>
        </div>
    )
}
export default AnimeCard;