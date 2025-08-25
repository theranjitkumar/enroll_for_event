# Event Enrollment with Stripe Payment

A web application for event enrollment with Stripe payment integration.

## Features

- User-friendly enrollment form
- Secure payment processing with Stripe
- Responsive design for all devices
- Success and cancel pages for payment flow
- Form validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Stripe account (for API keys)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enroll_for_event
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Stripe API keys:
     ```
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     PORT=3000
     ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:3000/enroll`

## Project Structure

- `app.js` - Main application file
- `routes/` - Route definitions
  - `enroll.js` - Enrollment and payment routes
- `controllers/` - Business logic
  - `enrollmentController.js` - Handles enrollment and payment processing
- `views/` - Templates
  - `enroll.hbs` - Enrollment form
  - `success.hbs` - Success page
  - `cancel.hbs` - Cancel page
- `public/` - Static files
  - `stylesheets/` - CSS styles

## Stripe Test Cards

For testing payments, use these test card numbers:

- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Requires authentication: 4000 0025 0000 3155

## Security Notes

- Never commit your `.env` file or expose your Stripe secret keys
- Always use HTTPS in production
- Keep your dependencies up to date

## License

MIT
