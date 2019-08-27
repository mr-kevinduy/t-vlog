import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/register', (req, res) => {
  User.save();
});

router.post('/login', (req, res) => {

});

router.post('/confirmation', (req, res) => {

});

router.post('/reset_password', (req, res) => {

});

router.post('/validate_token', (req, res) => {

});

export default router;
