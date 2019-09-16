import express from 'express';
import authMiddleware from '../../middlewares/auth';
import User from '../../models/User';

const router = express.Router();

router.get('/', (req, res, next) => {
  User.find().then(payload => payload ? res.json({ payload }) : res.status(400).json({}));
});

router.delete('/:id', authMiddleware.required, (req, res) => {
  console.log(req.payload);
});


export default router;
