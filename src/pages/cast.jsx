import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/service';

export const Cast = () => {
  const { movieId } = useParams();

  const [obsada, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const result = await getMovieCast(movieId);
      const casts = result.cast;
      setCast(casts);
      console.log(casts);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {obsada.map(({ name, popularity }) => (
        <ul key={name}>
          <li>{name}</li>
          <li>{popularity}</li>
        </ul>
      ))}
    </div>
  );
};
