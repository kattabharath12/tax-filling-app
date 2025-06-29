
import express from 'express';
import asyncHandler from 'express-async-handler';
import Submission from '../models/Submission.js';
import Payment from '../models/Payment.js';
import { protect } from './auth.js';

const router = express.Router();

router.get('/', protect, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const submissions = await Submission.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  const payments = await Payment.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  const totalSubmissions = await Submission.countDocuments({ user: userId });
  const acceptedSubmissions = await Submission.countDocuments({ user: userId, status: 'Accepted' });

  const progress = totalSubmissions > 0 ? (acceptedSubmissions / totalSubmissions) * 100 : 0;

  res.json({
    submissions,
    payments,
    progress: progress.toFixed(2),
  });
}));

export default router;
