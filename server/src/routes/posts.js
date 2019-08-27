import express from 'express';
import Post from '../models/Post';
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.post('/create', (req, res) => {
  Post.create(req.body.payload)
    .then(payload => res.json({ payload }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/:id/edit', (req, res) => {

});

export default router;

