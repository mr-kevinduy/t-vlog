import express from 'express';
import auth from './auth';
import users from './users';
import posts from './posts';
// import categories from './categories';

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('test!!!!');
  res.status(200).json({ payload: 'Test!!' });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
// router.use('/categories', categories);

export default router;
