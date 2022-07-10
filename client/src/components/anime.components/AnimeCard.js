import React from 'react'
import { Link } from "react-router-dom";
import '../css/animeCard.css';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const AnimeCard = (props) => {
    const anime = props.anime;


    return (

        <Link to={`/anime/${anime.uuid}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    height="290"
                    image={anime.image_url}
                    alt="Anime image"
                    sx={{ "maxWidth": '50%', "minWidth": "50%" }}
                />
                <CardContent>
                    <Typography variant="subtitle1" component="div" >
                        {anime.title_english}
                    </Typography>
                </CardContent>
            </Card>
            {/* <img className='' src={anime.image_url} alt="" />
                <h3></h3> */}
        </Link>
    )
}
export default AnimeCard;