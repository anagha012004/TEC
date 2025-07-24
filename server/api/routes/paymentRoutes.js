import express from "express";
import {addBooking, verifyPayment} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/addBooking", addBooking);
router.post("/verify", verifyPayment);
router.post('/dummy-success', async (req, res) => {
  const { amount } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    user.wallet = (user.wallet || 0) + parseFloat(amount);
    await user.save();

    res.status(200).json({ message: 'Dummy payment successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Transaction failed' });
  }
});

export default router;