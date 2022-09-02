import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Detalle () {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=544312123493d5b24c13b7003bb4b594&language=es-ES`
        axios.get(endPoint).then(response => {
            const movieData = response.data;
            setMovie(movieData);
        })
        .catch(error => {
            console.log(error);
        })
    }, [movieID]);

    return (
        <>
            { !token && <Redirect to="/" />  }
            { !movie && <p>Cargando...</p>}
            { movie && 
                <>
                    <h2>Titulo: {movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                        </div>
                        <div className='col-8'>
                            <h5>Fecha de estreno: { movie.release_date }</h5>
                            <h5>Reseña:</h5>
                            <p>{ movie.overview }</p>
                            <h5>Rating: { movie.vote_average } </h5>
                            <h5>Generos:</h5>
                            <ul>
                                { movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>) }
                            </ul>
                        </div>
                    </div>
                </>
            }            
        </>
    )
}

export default Detalle;