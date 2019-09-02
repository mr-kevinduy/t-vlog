import express from 'express';
import _ from 'lodash';
import { validationResult } from 'express-validator';
import Post from '../../models/Post';
import parseErrors from '../../utils/parseErrors';
import validate from '../../validates/index';
import postValidate from '../../validates/post';

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Post.findOne({_id: id})
    .then(payload => res.json({ payload }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/create', validate(postValidate), (req, res, next) => {
  console.log("Posts create!!!", req.body.payload);
  // console.log("error!!!", next);
  const errs = validationResult(req);
  console.log('Router Errs: ', errs.array());

  // if (!_.isEmpty(error)) res.status(400).json({ errors: parseErrors(err.error) });

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

