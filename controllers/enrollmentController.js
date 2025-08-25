const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Webinar prices in paise (100 paise = 1 INR)
const WEBINAR_PRICES = {
    webinar1: 49900,  // ₹499.00
    webinar2: 79900,  // ₹799.00
    webinar3: 99900   // ₹999.00
};

exports.getEnrollPage = (req, res) => {
    res.render('enroll', {
        title: 'Enroll for Webinar',
        razorpayKey: process.env.RAZORPAY_KEY_ID
    });
};

exports.createOrder = async (req, res) => {
    try {
        const { name, email, phone, webinar } = req.body;
        const amount = WEBINAR_PRICES[webinar];

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
            notes: {
                name: name,
                email: email,
                phone: phone,
                webinar: webinar
            }
        };

        const order = await razorpay.orders.create(options);

        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const text = razorpay_order_id + '|' + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment successful
            // Here you would typically:
            // 1. Save the enrollment to your database
            // 2. Send confirmation email
            // 3. Add user to your webinar platform

            // Return success response to the frontend
            res.json({
                success: true,
                redirect: '/enroll/success' // Use absolute URL for client-side redirection
            });
        } else {
            throw new Error('Invalid signature');
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Payment verification failed',
            redirect: '/enroll/cancel'
        });
    }
};

exports.getSuccessPage = (req, res) => {
    res.render('success', { title: 'Enrollment Successful' });
};

exports.getCancelPage = (req, res) => {
    res.render('cancel', { title: 'Enrollment Cancelled' });
};
