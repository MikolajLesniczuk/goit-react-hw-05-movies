import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/service';
import s from './moviedetails.module.css';

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(movieId);

      setDetails(data);
    };
    fetchDetails();
  }, [movieId]);

  const handleBack = () => {
    navigate(-1);
  };
  const { overview, title, genres, vote_average } = details;
  const userScore = Math.round(vote_average * 10) + '%';

  return (
    <div>
      <button className={s.goback} onClick={handleBack}>
        {' '}
        Go Back
      </button>
      <div>
        {details.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={s.detailsflex}>
              <div>
                <img
                  alt={title}
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                ></img>
              </div>
              <div>
                {' '}
                <p className={s.infotitle}>{title}</p>
                <p className={s.info}>User Score: {userScore}</p>
                <p className={s.info}>Overview: {overview}</p>
                <p className={s.info}>
                  Genres: {genres.map(el => (el.id = el.name)).join(', ')}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <p className={s.addinfo}>Additional information</p>
      <Link className={s.cast} to={`/movies/${movieId}/cast`}>
        Cast
      </Link>
      <Link className={s.reviews} to={`/movies/${movieId}/reviews`}>
        Reviews
      </Link>
      <Outlet />
    </div>
  );
};
