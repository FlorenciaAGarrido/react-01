import { Link, Redirect } from "react-router-dom"

function Favoritos(props) {
    let token = sessionStorage.getItem('token');
    return (
        <>
            {!token && <Redirect to="/" />}
            <h2>Seccion de favoritos</h2>    
            <div className='row'>
                { !props.favorites.length && <div className="col-12 text-danger">No tenes nada en Favoritos</div>}
                {
                    props.favorites.map((oneMovie, indx) => {
                        return (
                            <div className='col-3' key={indx}>
                                <div className="card">
                                    <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                                    <button 
                                        className='favourite-btn'
                                    onClick={props.addOrRemoveFromFavs}
                                    data-movie-id={oneMovie.id}
                                    >🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title.substring(0, 30) }...</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0, 100) }...</p>
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

export default Favoritos 