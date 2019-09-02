import express from 'express';
import auth from './v1/auth';
import users from './v1/users';
import posts from './v1/posts';
// import categories from './v1/categories';

const router = express.Router();

router.get('/v1/test', (req, res) => {
  console.log('test!!!!');
  res.status(200).json({ payload: 'Test!!' });
});

router.use('/v1/auth', auth);
router.use('/v1/users', users);
router.use('/v1/posts', posts);
// router.use('/v1/categories', categories);

export default router;
