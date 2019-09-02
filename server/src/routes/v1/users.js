import express from 'express';
import authMiddleware from '../../middlewares/auth';
import User from '../../models/User';

const router = express.Router();

router.get('/', (req, res, next) => {

});

router.delete('/:id', authMiddleware.required, (req, res) => {
  console.log(req.payload);
});


export default router;
