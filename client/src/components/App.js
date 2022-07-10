import AnimesList from "./anime.components/AnimesList";
import { useEffect, useState } from "react";
import { getAllAnimes } from "./../api/fetch.api";
import './css/main.css';
import AnimePage from './anime.components/AnimePage';
import { Routes, Route } from "react-router-dom";
function App() {
   const [animes, setAnimes] = useState([]);

   useEffect(() => {
      loadAnimes();
   }, []);


   const findAnime = (uuid) => {
      return animes.find(anime => anime.uuid === uuid)
   }

   const loadAnimes = () => {
      getAllAnimes()
         .then((resp) => resp.json())
         .then(
            (result) => {
               setAnimes(result);
            },
            (error) => {
               console.log(error)
            }
         );
   }


   return (
      <Routes>
         <Route path='/' element={<AnimesList animes={animes} />} />
         <Route path='/anime/:uuid' element={<AnimePage findAnime={findAnime} />} />
      </Routes>
   );
}

export default App;
