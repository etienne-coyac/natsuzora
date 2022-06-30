import React from 'react'
import AnimeCard from "./AnimeCard";
import { motion } from 'framer-motion';

const AnimesList = (props) => {
   if (props.error) {
      return <div>Erreur : {props.error}</div>;
   }
   return (
      <motion.div
         initial={{ opacity: 0, 'transform': 'translateY(-15px)' }}
         animate={{ opacity: 1, 'transform': 'translateY(0px)' }}
         exit={{ opacity: 0, 'transform': 'translateY(-15px)' }}
         transition={{ duration: 0.4, ease: "easeInOut" }}
         style={{ minHeight: '100%' }} >
         <div className='row'>
            {props.animes.map((anime) => (
               <AnimeCard anime={anime} key={anime.uuid} />
            ))}
         </div>
      </motion.div>

   )
}

export default AnimesList;
