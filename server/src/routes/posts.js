import express from 'express';
import Post from '../models/Post';
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Post.findOne({_id: id})
    .then(payload => res.json({ payload }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/create', (req, res) => {
  console.log("Posts create!!!", req.body.payload);

  Post.create(req.body.payload)
    .then(payload => res.json({ payload }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body.payload;

  Post.findOne({_id: id}, (err, post) => {
    if (!err) {
      if (!post) {
        post = new ContactSchema();
      }

      post.title = title;
      post.content = content;

      post
        .save()
        .then(payload => res.json({ payload }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
    }
  });
});

export default router;

