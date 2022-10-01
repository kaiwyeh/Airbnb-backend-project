const express = require('express');
const { Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthorization } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
 const { user } = req;
 const { reviewId } = req.params;
 const { url } = req.body
 const findReview = await Review.findByPk(reviewId);

 if (!findReview) {
  res.status(404)
  return res.json({
   message: "Review couldn't be found",
   statusCode: 404
  })
 }

 const allImages = await ReviewImage.findAll({
  where: {
   reviewId
  }
 })

 if (allImages.length > 3) {
  res.status(403)
  return res.json({
   message: "Maximum number of images for this resource was reached",
   statusCode: 403
  })
 }

 if (findReview.userId === user.id) {
  const newImage = await ReviewImage.create({ reviewId, url })
  return res.json({
   id: newImage.id,
   url
  })
 } else {
  await requireAuthorization(req, res, next);
 }
})

//-----------------------
router.get('/current', requireAuth, async (req, res, next) => {
 const { user } = req;
 const allReviews = await Review.findAll({
  where: {
   userId: user.id
  },
  include: [
   {
    model: Spot,
    attributes: {
     exclude: ["description", "createdAt", "updatedAt"]
    }
   },
   {
    model: User,
    attributes: ["id", "firstName", "lastName"]
   },
   {
    model: ReviewImage,
    attributes: ["id", "url"]
   }
  ],
 });

 let ReviewList = []
 allReviews.forEach(review => {
  ReviewList.push(review.toJSON())
 })

 ReviewList.forEach(review => {
  review.ReviewImages.forEach(image => {
   review.Spot.previewImage = image.url
  })
  if (!review.ReviewImages[0]) {
   review.Spot.previewImage = 'no preview image found'
  }
 })
 return res.json({ ReviewList })
})

//------------------------------------------

const validateNewReview = [
 check('review')
  .exists({ checkFalsy: true })
  .withMessage("Review text is required"),
 check('stars')
  .exists({ checkFalsy: true })
  .custom((value) => value <= 5 && value >= 1)
  .withMessage("Stars must be an integer from 1 to 5"),
 handleValidationErrors
]


router.put('/:reviewId', requireAuth, validateNewReview, async (req, res, next) => {
 const { user } = req;
 const { reviewId } = req.params;
 const { review, stars } = req.body
 const findReviewById = await Review.findByPk(reviewId);

 if (!findReviewById) {
  res.status(404)
  return res.json({
   message: "Review couldn't be found",
   statusCode: 404
  })
 }

 if (findReviewById.userId === user.id) {
  await findReviewById.update(
   { review, stars }
  )
  return res.json(findReviewById)
 } else {
  await requireAuthorization(req, res, next);
 }
})


router.delete('/:reviewId', requireAuth, async (req, res, next) => {
 const { user } = req;
 const { reviewId } = req.params;
 const findReviewById = await Review.findByPk(reviewId);

 if (!findReviewById) {
  res.status(404)
  return res.json({
   message: "Review couldn't be found",
   statusCode: 404
  })
 }

 if (!findReviewById.userId === user.id) {
  await findReviewById.destroy()
  res.status(200)
  return res.json({
   message: "Successfully deleted",
   statusCode: 200
  })
 } else {
  await requireAuthorization(req, res, next);
 }
})




module.exports = router;
