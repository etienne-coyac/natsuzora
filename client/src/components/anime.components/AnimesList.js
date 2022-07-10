import React from 'react'
import AnimeCard from "./AnimeCard";
import Grid from '@mui/material/Grid';

const AnimesList = (props) => {
   if (props.error) {
      return <div>Erreur : {props.error}</div>;
   }
   return (
      <Grid container spacing={2} sx={{ padding: '8px' }}>
         {props.animes.map((anime) => (
            <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
               <AnimeCard anime={anime} key={anime.uuid} />

            </Grid>
         ))}
      </Grid>


   )
}

export default AnimesList;
