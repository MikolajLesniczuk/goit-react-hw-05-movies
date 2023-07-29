import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/service';
import s from './reviews.module.css';
import { nanoid } from 'nanoid';
export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(movieId);
      const result = data.results;
      setReviews(result);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>There are no reviews</p>
      ) : (
        reviews.map(
          ({ author, content }) =>
            author &&
            content && (
              <ul key={nanoid()} className={s.reviewslist}>
                <li className={s.textauthor}>Author name: {author}</li>
                <li className={s.text}>{content}</li>
              </ul>
            )
        )
      )}
    </div>
  );
};
