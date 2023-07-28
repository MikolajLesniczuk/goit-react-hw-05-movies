import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from 'services/service';
import s from './home.module.css';
import st from './movies.module.css';

const Movies = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState('');
  const [movieresult, setmovieresult] = useState([]);

  const handleInputChange = e => {
    setSearchParams(e.target.value);
  };

  const fetchMovies = async () => {
    const data = await searchMovies(searchParams);
    const results = data.results;
    setmovieresult(results);
  };

  const handleNavigated = id => {
    navigate(`/movies/${id}`);
  };

  useEffect(() => {
    if (searchParams.trim() !== '') {
      fetchMovies();
    } else {
      setmovieresult([]);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <div>
      <div>
        <form className={st.form} onSubmit={e => e.preventDefault()}>
          <input
            className={st.input}
            type="text"
            value={searchParams}
            placeholder="search movies"
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div>
        {' '}
        <div className={s.flexmain}>
          {movieresult.length !== 0
            ? movieresult.map(
                ({ id, title, poster_path }) =>
                  poster_path && (
                    <ul className={s.ullist} key={id}>
                      <li className={s.flexList}>
                        <img
                          className={s.imagesMovie}
                          alt={title}
                          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        ></img>
                        <div className={s.listMovie}>
                          <p className={s.title}>{title}</p>

                          <button
                            className={s.button}
                            onClick={() => handleNavigated(id)}
                          >
                            More Details
                          </button>
                        </div>
                      </li>
                    </ul>
                  )
              )
            : searchParams !== '' && (
                <p className={s.alert}>There is nothing, try again </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
