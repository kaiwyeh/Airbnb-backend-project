// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

module.exports = router;







// phase 3 testing
// // backend/routes/api/index.js
// const router = require('express').Router();

// module.exports = router;

// // backend/routes/api/index.js
// // ...

// router.post('/test', function (req, res) {
//  res.json({ requestBody: req.body });
// });

// // ...


// // backend/routes/api/index.js
// // ...

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//  const user = await User.findOne({
//   where: {
//    username: 'Demo-lition'
//   }
//  });
//  setTokenCookie(res, user);
//  return res.json({ user });
// });

// // ...


// // backend/routes/api/index.js
// // ...

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');

// router.use(restoreUser);

// router.get(
//  '/restore-user',
//  (req, res) => {
//   return res.json(req.user);
//  }
// );

// // ...



// // backend/routes/api/index.js
// // ...

// router.use(restoreUser);

// // ...

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//  '/require-auth',
//  requireAuth,
//  (req, res) => {
//   return res.json(req.user);
//  }
// );

// // ...