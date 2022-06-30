import AnimesList from "./anime.components/AnimesList";
import { useEffect, useState } from "react";
import { getAllAnimes } from "./../api/fetch.api";
import './css/main.css';
import AnimePage from './anime.components/AnimePage';
import {
   Routes,
   Route,
   useLocation
} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
function App() {
   const [animes, setAnimes] = useState([]);
   const location = useLocation();

   useEffect(() => {
      loadAnimes();
   }, [location]);


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
      <AnimatePresence exitBeforeEnter >
         <Routes location={location} key={location.pathname}>
            <Route path='/' element={<AnimesList animes={animes} />} />
            <Route path='/anime/:uuid' element={<AnimePage findAnime={findAnime} />} />
         </Routes>
      </AnimatePresence>
   );
}

export default App;
