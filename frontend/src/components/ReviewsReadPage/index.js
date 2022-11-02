import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';
import ReviewsCreateModal from '../ReviewsCreatePage/ReviewsCreateModal';
import { getASpot } from '../../store/spots';

import './ReviewsReadPage.css'


const ReviewsReadPage = ({ spotId }) => {
 const { id } = useParams();
 const dispatch = useDispatch();

 const owner = useSelector(state => state.session.user)
 const reviewsObj = useSelector(state => state.review)
 const reviews = Object.values(reviewsObj)

 const spot = useSelector(state => state.spot[id])

 const date = new Date()
 const options = {
  month: 'long',
  year: 'numeric'

 }



 useEffect(() => {
  dispatch(getASpot(spotId));
  dispatch(thunkReadReview(id));
 }, [dispatch, spotId, id]);


 return (
  <div className="allreviews_container">
   <div className="reviewstitlediv">
    <i className="fa-solid fa-star"></i>&nbsp;
    {`${spot?.avgStarRating} · ${reviews.length} reviews`}
   </div>
   {reviews.map((review) => (
    <div className="reviewcontainer" key={review.id}>
     <div className="profilereview">
      <div className="profilereview_container">
       <i className="fa-solid fa-user fa-2xl"></i>&nbsp;
       <div className="reviewnamedate">
        <div className='reviewuserfirstname'>
         {` ${review?.User?.firstName}`}
        </div>
        <div className='reviewdate_color'>{`${date.toLocaleDateString(
         undefined,
         options
        )}`}</div>
       </div>
      </div>
      <div className="reviewtext_container">{review.review}</div>
     </div>
    </div>
   ))}
   {owner && (
    <div className="reviewcreate_button">
     <ReviewsCreateModal spotId={spot?.id} />
    </div>
   )}
  </div>
 );
}

export default ReviewsReadPage;