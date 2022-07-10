import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const AnimePage = (props) => {
    const { uuid } = useParams();
    const [anime, setAnime] = useState();
    const findAnime = props.findAnime;
    useEffect(() => {
        setAnime(findAnime(uuid))
    }, [findAnime, uuid])

    return (
        <div>
            {anime &&
                <div >
                    <img src={anime.image_url} alt="" />
                    <Typography gutterBottom variant="h4" component="h4">{anime.title}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{anime.synopsis}</Typography>
                    <Typography gutterBottom variant="body2" component="p">Release : {(new Date(anime.aired_begin).toLocaleDateString("fr"))}</Typography>
                </div>
            }
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Button variant="contained" >
                    Back
                </Button>
            </Link>
        </div>
    )
}
export default AnimePage;