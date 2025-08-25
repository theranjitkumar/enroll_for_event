const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// GET enrollment page
router.get('/', enrollmentController.getEnrollPage);

// Create Razorpay order
router.post('/create-order', enrollmentController.createOrder);

// Verify payment and process enrollment
router.post('/verify-payment', (req, res) => {
    // This will be handled by the controller
    enrollmentController.verifyPayment(req, res);
});

// Success page
router.get('/success', enrollmentController.getSuccessPage);

// Cancel page
router.get('/cancel', enrollmentController.getCancelPage);

module.exports = router;
