import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react'
import swal from 'sweetalert';

function Resultados () {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=544312123493d5b24c13b7003bb4b594&language=es-ES&query=${keyword}`
        axios.get(endPoint).then(response => {
            const moviesArrays = response.data.results;
            if (moviesArrays.length === 0 ) {
                swAlert(<h4>Tu busqueda no arrojo resultados</h4>)
            };
            setMovieResults(moviesArrays);
        })
        .catch(error => console.log(error));
    }, [keyword]);

    return (
        <>
            <h2>Buscaste: <em>{keyword}</em> </h2>       
            
            {movieResults.length === 0 && <h3>No hay resultados</h3> }

            <div className='row'>
                {
                    movieResults.map((oneMovie, indx) => {
                        return (
                            <div className='col-4' key={indx}>
                    <div className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{oneMovie.title.substring(0, 30) }...</h5>
                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Vie detail</Link>
                        </div>
                    </div>
                </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default Resultados