import AnimesList from "./anime.components/AnimesList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAnimes } from "./../api/fetch.api";
import './css/main.css';
import AnimePage from './anime.components/AnimePage';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./auth.components/Login";
import Register from "./auth.components/Register";
import { AnimatePresence } from "framer-motion";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

function App() {
   const [animes, setAnimes] = useState([]);
   const location = useLocation();
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
      <div>
         <AppBar position="static" className="menu">
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
               >
               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="menu_title">
                  NATSUZORA
               </Typography>
               <Link to="/login" className="menu_login_link"><Button color="inherit">Login</Button></Link>
            </Toolbar>
         </AppBar>
         <Routes>
            <Route path="/" element={<Navigate to="/animes/list" />} />
            <Route path='/animes/list' element={<AnimesList animes={animes} />} />

            <Route path='/anime/:uuid' element={<AnimePage findAnime={findAnime} />} />
         </Routes>
         <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
               <Route path='/register' element={<Register />} />
               <Route path='/login' element={<Login />} />
            </Routes>
         </AnimatePresence>
      </div>
   );
}

export default App;
