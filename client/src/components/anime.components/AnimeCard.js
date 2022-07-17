import React from 'react'
import { Link } from "react-router-dom";
import '../css/animeCard.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const AnimeCard = (props) => {
    const anime = props.anime;

    return (

        <Card className='anime_card'>
            <Link to={`/anime/${anime.uuid}`} className="image_card_link">
                <CardMedia
                    component="img"

                    image={anime.image_url}
                    alt="Anime image"
                    className='card_image'
                />
            </Link>
            <CardContent className="anime_card_content" sx={{ width: '60%', "padding": "0", "padding-bottom": "0" }}>
                <Typography component="div" className='anime-card-title'>
                    {anime.title}
                </Typography>

            </CardContent>

        </Card>

    )
}

export default AnimeCard;