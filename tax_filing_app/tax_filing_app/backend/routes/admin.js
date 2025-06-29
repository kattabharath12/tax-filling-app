
import express from 'express';
import asyncHandler from 'express-async-handler';
import Submission from '../models/Submission.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { protect } from './auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/submissions', protect, admin, asyncHandler(async (req, res) => {
  const { status, userId, formType } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (userId) filter.user = userId;
  if (formType) filter.formType = formType;

  const submissions = await Submission.find(filter)
    .populate('user', 'email name')
    .sort({ createdAt: -1 });

  res.json(submissions);
}));

router.get('/payments', protect, admin, asyncHandler(async (req, res) => {
  const { paymentStatus, userId } = req.query;
  const filter = {};
  if (paymentStatus) filter.paymentStatus = paymentStatus;
  if (userId) filter.user = userId;

  const payments = await Payment.find(filter)
    .populate('user', 'email name')
    .sort({ createdAt: -1 });

  res.json(payments);
}));

router.get('/users', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
}));

export default router;
