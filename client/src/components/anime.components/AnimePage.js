import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnimePage = (props) => {
    const { uuid } = useParams();
    const [anime, setAnime] = useState();
    const findAnime = props.findAnime;
    useEffect(() => {
        setAnime(findAnime(uuid))
    }, [findAnime, uuid])

    return (
        <>
            <motion.div
                initial={{ opacity: 0, 'transform': 'translateY(20px)' }}
                animate={{ opacity: 1, 'transform': 'translateY(0px)' }}
                exit={{ opacity: 0, 'transform': 'translateY(20px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ minHeight: '100%' }} >
                {anime &&
                    <div className='card col-sm-4'>
                        <img className='col-sm-6' src={anime.image_url} alt="" />
                        <h3>{anime.title}</h3>
                    </div>
                }
                <Link to={"/"}>Retour</Link>
            </motion.div>
        </>
    )
}
export default AnimePage;