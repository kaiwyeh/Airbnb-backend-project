import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteReviewById } from '../../store/reviews';

import './ReviewsDeletePage.css'



const ReviewsDeletePage = ({ reviewId, spotId }) => {
 const dispatch = useDispatch();
 const history = useHistory();
 

 const review = useSelector(state => state.review[reviewId])

 const onClick = async (event) => {
  event.preventDefault();
  await dispatch(deleteReviewById(Number(review.id)))
  history.push(`/spots/${spotId}`)
 }

 return (
  <button className='deletereviewbutton' onClick={onClick}>Delete Review</button>
 )
}

export default ReviewsDeletePage;
