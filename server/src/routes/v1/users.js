import express from 'express';
import Auth from '../../middlewares/auth';
import User from '../../models/User';

const router = express.Router();

router.get('/', Auth.required, (req, res, next) => {
  User.find().then(payload => payload ? res.json({ payload }) : res.status(400).json({}));
});

router.delete('/:id', Auth.required, (req, res) => {
  console.log(req.payload);
});


export default router;
